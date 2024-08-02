import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { GetUserLogin, LimpState, LimpError } from '../../redux/actions'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function Login() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(LimpState())
  }, [dispatch])

  const user = useSelector((state) => state.User)
  const error = useSelector((state) => state.error)
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    if (user?.admin === true) {
      setTimeout(() => {
        setRedirect('/admin')
      }, 2000)
    } else if (user?.name) {
      setTimeout(() => {
        setRedirect('/home')
      }, 2000)
    }
  }, [user])

  useEffect(() => {
    notify()
  }, [error])

  if (redirect) {
    return <Navigate to={redirect} />
  }

  const notify = () => {
    if (error[0] === 'Entrando') {
      toast.success(`Bienvenido ${user.name}!`, {
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 border border-custom-purple rounded-lg p-8">
        <div>
          <h2 className="text-custom-purple mt-6 text-center text-3xl font-extrabold text-foreground">
            Ingrese su cuenta
          </h2>
        </div>
        <Formik
          initialValues={{
            name: '',
            password: '',
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
            return errors
          }}
          onSubmit={(valores, { resetForm }) => {
            resetForm()
            dispatch(GetUserLogin(valores))
          }}
        >
          {({ errors }) => (
            <Form className="mt-8 space-y-6">
              
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="sr-only ">Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="text-black appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-input placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Name"
                  />
                  <ErrorMessage
                    name="name"
                    component={() => (
                      <span className="text-red-600">{errors.name}</span>
                    )}
                  />
                </div>
                <div className="pt-5">
                  <label className="sr-only ">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="text-black appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-input placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <span className="text-red-600">{errors.password}</span>
                    )}
                  />
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                <Link
                  to="/create-user"
                  className="text-custom-purple font-medium text-primary hover:text-primary/80"
                >
                  Create a new account
                </Link>
              </p>
              <div className="bg-custom-purple rounded-lg">
                <button
                  onClick={notify}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
