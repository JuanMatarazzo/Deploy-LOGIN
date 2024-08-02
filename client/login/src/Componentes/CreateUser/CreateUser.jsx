import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserCreate, LimpState, LimpError } from '../../redux/actions'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'

function CreateUser() {
  let error = useSelector((state) => state.error)
  useEffect(() => {
    return () => {
      dispatch(LimpState())
    }
  }, [])

  useEffect(() => {
    notify()
  }, [error])

  const dispatch = useDispatch()

  const notify = () => {
    if (error[0] === 'Creado') {
      toast.success(`Usuario creado!!`, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      dispatch(LimpError())
    }
    if (error[0] === 'Error') {
      toast.error('Por favor verifique los campos', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      dispatch(LimpError())
    }
  }

  if (error[0] === 'Creado') {
    return <Navigate to={'/home'} />
  }
  return (
    <div className="h-svh ">
      <button class="bg-primary text-primary-foreground p-3 rounded-lg shadow hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50">
        <Link to={'/'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="inline-block mr-2 w-8 h-8 bg-white rounded-sm"
          >
            <path d="M14.29 16.29a1 1 0 0 0 0-1.42L10.41 12l3.88-3.88a1 1 0 0 0-1.42-1.42L8.29 11.29a1 1 0 0 0 0 1.42l4.58 4.58a1 1 0 0 0 1.42 0z" />
          </svg>
        </Link>
      </button>
      <div className="max-w-lg mx-auto p-4 bg-card text-card-foreground shadow-lg rounded-lg border-2 border-custom-purple mt-5">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            gender: '',
            image: '',
            age: '',
          }}
          validate={(valores) => {
            let errors = {}
            if (!valores.name) {
              errors.name = 'Ingrese un name'
            } else if (!/^[a-zA-Z0-9]{4,16}$/.test(valores.name)) {
              errors.name =
                'Debe contener entre 4 a 16 digitos, y solo puede contener letras y numeros'
            }

            if (!valores.password) {
              errors.password = 'Ingrese una contraseña'
            } else if (
              !/^(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{4,20}$/.test(valores.password)
            ) {
              errors.password =
                'Debe contener entre 4 a 20 digitos, una letra en mayuscula, y un simbolo'
            }

            if (!valores.email) {
              errors.email = 'Ingrese un email'
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email)) {
              errors.email = 'Su email es invalido!'
            }

            if (!valores.gender) {
              errors.gender = 'Ingrese un genero!'
            }

            if (!valores.image) {
              errors.image = 'Ingrese una imagen valida!'
            } else if (!/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(valores.image)) {
              errors.image = 'Ingrese un url valido!'
            }

            if (!valores.age) {
              errors.age = 'Ingrese una edad valida!'
            } else if (valores.age < 10 || valores.age > 80) {
              errors.age = 'Ingrese una edad valida entre 10 a 80 años.'
            }
            return errors
          }}
          onSubmit={(valores, { resetForm }) => {
            resetForm()
            dispatch(GetUserCreate(valores))
          }}
        >
          {({ errors }) => (
            <Form>
              <div className="mb-4">
                <label for="name" className="block text-sm font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="text-black mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Your Name"
                />
                <ErrorMessage
                  name="name"
                  component={() => (
                    <span className="text-red-600">{errors.name}</span>
                  )}
                />
              </div>
              <div className="mb-4">
                <label for="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="text-black mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="you@example.com"
                />
                <ErrorMessage
                  name="email"
                  component={() => (
                    <span className="text-red-600">{errors.email}</span>
                  )}
                />
              </div>
              <div className="mb-4">
                <label for="password" className="block text-sm font-medium">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="text-black mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
                <ErrorMessage
                  name="password"
                  component={() => (
                    <span className="text-red-600">{errors.password}</span>
                  )}
                />
              </div>
              <div className="mb-4">
                <label for="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="text-black mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  <option value="">Selecciona un género</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component={() => (
                    <span className="text-red-600">{errors.gender}</span>
                  )}
                />
              </div>
              <div className="mb-4">
                <label for="image" className="block text-sm font-medium">
                  Image
                </label>
                <Field
                  type="url"
                  id="image"
                  name="image"
                  className="text-black mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="http://example.com/your-image.jpg"
                />
                <ErrorMessage
                  name="image"
                  component={() => (
                    <span className="text-red-600">{errors.image}</span>
                  )}
                />
              </div>
              <div className="mb-4">
                <label for="age" className="block text-sm font-medium">
                  Age
                </label>
                <Field
                  type="number"
                  id="age"
                  name="age"
                  className="text-black mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="30"
                  min="0"
                />
                <ErrorMessage
                  name="age"
                  component={() => (
                    <span className="text-red-600">{errors.age}</span>
                  )}
                />
              </div>
              <button
                type="submit"
                onClick={notify}
                className="bg-custom-purple w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Create User
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateUser
