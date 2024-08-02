import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { GetUsersAll, LimpState } from '../../redux/actions'
import Users from '../Users/Users'
import { toast } from 'react-toastify'
import Filter from '../Filtros/Filter'
import Buscador from '../Buscador/Buscador'

function DashBoradAdmin() {
  const user = useSelector((state) => state.User)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetUsersAll())
  }, [])
  if (user.length === 0) {
    return <Navigate to="/" />
  }

  if (user.admin === false) {
    return <Navigate to="/" />
  }
  const formatName = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase()
  }
  const handleLogaut = () => {
    dispatch(LimpState())
    toast.success(` 🤚 Adios ${formatName(user.name)}!`, {
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card text-card-foreground p-4 flex justify-between items-center">
        <h1 className="text-custom-purple text-2xl font-bold">Bienvenido {user.name}</h1>
        <button onClick={handleLogaut} className="bg-slate-400 text-secondary-foreground px-4 py-2 rounded-lg hover:bg-slate-600">
          Logout
        </button>
      </header>
      <Filter/>
        <Buscador/>
      {/* <Users/> */}
    </div>
  )
}

export default DashBoradAdmin
