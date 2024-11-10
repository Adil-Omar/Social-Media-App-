import React, { useEffect, useState } from 'react'
import Routing from './routing/Routing'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from './store/slices/authSlice'


export default function App() {

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCurrentUser(setLoading))
  },[])

  return (
    <div>
      {loading ? <h1>Loading ... </h1> : <Routing />}
    </div>
  )
}
