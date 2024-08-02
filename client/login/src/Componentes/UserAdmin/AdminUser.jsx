import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserId, LimpDetail, DeleteUser } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import UpdateUseer from '../UpdateUseer/UpdateUseer.jsx'
import ModalEliminate from '../../ModalEliminete/ModalEliminate'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
function AdminUser() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.UserId)
  const user = useSelector((state) => state.User)
  const { id } = useParams()
  const [showUpdate, setShowUpdate] = useState(false)
  const [showEliminate, setShowEliminate] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(GetUserId(id))

    return function () {
      dispatch(LimpDetail())
    }
  }, [])

  if (user.length === 0) {
    return <Navigate to="/" />
  }

  if (user.admin === false) {
    return <Navigate to="/" />
  }
  const deleteUser = () => {
    dispatch(DeleteUser(userId.id))
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
    navigate('/admin')
  }
  const formatName = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase()
  }
  return (
    <div class="min-h-screen  bg-background text-foreground p-4 flex-row items-center justify-center ">
      <button class="bg-primary text-primary-foreground p-3 rounded-lg shadow hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50">
        <Link to={'/admin'}>
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

      <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false, amount:0.5}}
        className="m-auto max-w-4xl mt-36 mx-auto border-2 border-custom-purple rounded-lg shadow-custom-dark "
      >
        <div class="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
          <div class="flex flex-col md:flex-row items-center md:space-x-6">
            <img
              class="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-accent"
              src={userId?.image}
              alt="User photo"
            />
            <div class="mt-4 md:mt-0">
              <h2 class="text-3xl font-bold">
                Welcome, <span id="userName">{formatName(userId?.name)}</span>
              </h2>
              <div class="mt-2 text-lg">
                <p>
                  Email: <span id="userEmail">{userId?.email}</span>
                </p>
                <p>
                  Gender: <span id="userGender">{userId?.gender}</span>
                </p>
                <p>
                  Age: <span id="userAge">{userId?.age}</span>
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
            {showUpdate && (
              <UpdateUseer
                setShowUpdate={setShowUpdate}
                showUpdate={showUpdate}
              />
            )}
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
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminUser
