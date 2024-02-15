/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children, isAuthRequired = true }) {
  const [ loading, setLoading ] = React.useState(false)
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthRequired && !authStatus) {
      navigate('/login')
    } else if (!isAuthRequired && authStatus) {
      navigate('/')
    }

    setLoading(false)
  }, [ isAuthRequired, authStatus, navigate ])

  return loading ? <h1>Loading...</h1> : <>{children}</>
}
