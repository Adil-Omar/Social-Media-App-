import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, redirect } from 'react-router-dom'

export default function PrivateRoute({children}) {
const user = useSelector(store=> store.authSlice.user)

  return (
    user ? children : <Navigate to="/login" />
  )
}
