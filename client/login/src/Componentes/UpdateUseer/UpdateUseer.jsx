import React, { useState, useEffect } from 'react'
import { UpdateUser } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LimpError } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function UpdateUseer({ setShowUpdate, showUpdate }) {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.UserId)
  const error = useSelector((state) => state.error)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    notify()
  }, [error])

  const notify = () => {
    if (error[0] === 'Actualizado') {
      toast.success(`Tu usuario fue actualizado con Exito!`, {
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
      navigate('/admin')
    }
    if (error[0] === 'Error') {
      toast.error('Nombre o contraseña Invalida!!', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      dispatch(LimpError())
    }
  }

  return (
    <div className="fixed inset-0  bg-zinc-600  bg-opacity-50 flex justify-center items-center p-4 ">
      <div className="bg-black w-full max-w-lg p-6 rounded-lg shadow-lg border-2 border-custom-purple">
        <h2 className="text-card-foreground text-2xl font-bold mb-4 text-center text-custom-purple">
          Update User: {userId.name}
        </h2>
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
          onSubmit={(valores) => {
            dispatch(UpdateUser(id, valores))
          }}
        >
          {({ errors }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  className="text-black w-full px-3 py-2 border border-border rounded-md text-input bg-input"
                  placeholder="Your name"
                />
                <ErrorMessage
                  name="name"
                  component={() => (
                    <span className="text-red-600">{errors.name}</span>
                  )}
                />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
                  placeholder="example@example.com"
                />
                <ErrorMessage
                  name="email"
                  component={() => (
                    <span className="text-red-600">{errors.email}</span>
                  )}
                />
              </div>
              <div>
                <Field
                  as="select"
                  name="gender"
                  className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
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
              <div>
                <Field
                  type="password"
                  name="password"
                  className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
                  placeholder="********"
                />
                <ErrorMessage
                  name="password"
                  component={() => (
                    <span className="text-red-600">{errors.password}</span>
                  )}
                />
              </div>
              <div>
                <Field
                  type="url"
                  name="image"
                  className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
                  placeholder="https://example.com/image.jpg"
                />
                <ErrorMessage
                  name="image"
                  component={() => (
                    <span className="text-red-600">{errors.image}</span>
                  )}
                />
              </div>
              <div>
                <Field
                  type="number"
                  name="age"
                  className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
                  placeholder="30"
                />
                <ErrorMessage
                  name="age"
                  component={() => (
                    <span className="text-red-600">{errors.age}</span>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowUpdate(!showUpdate)}
                  type="button"
                  className="bg-slate-500 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  Cancel
                </button>
                <button
                  onClick={notify}
                  type="submit"
                  className="bg-custom-purple px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  Confirm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateUseer
