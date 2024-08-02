import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UpdaUser from '../Update/UpdaUser'
import { DeleteUser, LimpState } from '../../redux/actions'
import ModalEliminate from '../../ModalEliminete/ModalEliminate'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Home() {
  const user = useSelector((state) => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formatName = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase()
  }
  const [showUpdate, setShowUpdate] = useState(false)
  const [showEliminate, setShowEliminate] = useState(false)

  const deleteUser = () => {
    dispatch(DeleteUser(user.id))
    toast.success(`El usuario fue eliminado con exito!`, {
      position: 'bottom-right',
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
    navigate('/')
  }

  const Logout = () => {
    dispatch(LimpState())
    toast.success(`🤚 Adios ${formatName(user.name)}!`, {
      position: 'bottom-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }
  return (
    <div class="min-h-screen  bg-background text-foreground p-4 flex-row items-center justify-center ">
      <div class="m-auto max-w-4xl mt-36 mx-auto border-2 border-custom-purple rounded-lg shadow-custom-dark ">
        <div class="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
          <div class="flex flex-col md:flex-row items-center md:space-x-6">
            <img
              class="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-accent"
              src={user?.image}
              alt="User photo"
            />
            <div class="mt-4 md:mt-0">
              <h2 class="text-3xl font-bold">
                Welcome, <span id="userName">{formatName(user?.name)}</span>
              </h2>
              <div class="mt-2 text-lg">
                <p>
                  Email: <span id="userEmail">{user?.email}</span>
                </p>
                <p>
                  Gender: <span id="userGender">{user?.gender}</span>
                </p>
                <p>
                  Age: <span id="userAge">{user?.age}</span>
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-center space-x-2 mt-6">
            <button
              onClick={() => setShowUpdate(!showUpdate)}
              class="bg-custom-purple bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              {showUpdate ? 'Actualizar User' : 'Actualizar User'}
            </button>
            {showUpdate && <UpdaUser setShowUpdate={setShowUpdate} showUpdate={showUpdate}/>}
            <button
              onClick={() => setShowEliminate(!showEliminate)}
              class="bg-red-800 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg hover:bg-destructive/80 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-opacity-50"
            >
              {showEliminate ? 'Eliminar user' : 'Eliminar user'}
            </button>
            {showEliminate && (
              <ModalEliminate
                deleteUser={deleteUser}
                setShowEliminate={setShowEliminate}
                showEliminate={showEliminate}
              />
            )}
            <button
              onClick={Logout}
              class="bg-slate-400 bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
