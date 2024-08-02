import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.User)

  if (user?.length === 0) {
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
