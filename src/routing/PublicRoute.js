import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'

export default function PublicRoute({children}) {

    const user = useSelector(store=> store.authSlice.user)
  return (
    user ?  <Navigate to="/" />: children
  )
}
