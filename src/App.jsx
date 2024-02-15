import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import authService from './appwrite/authService'
import { login, logout } from './redux/authSlice'
import { useDispatch } from 'react-redux'

export default function App() {
  const [ loading, setLoading ] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    async function checkAuth() {
      const userData = await authService.getCurrentUser()
      if (!userData) {
        dispatch(logout())
        setLoading(false)
        return
      }

      dispatch(login(userData))
      setLoading(false)
    }

    checkAuth()
  }, [])

  return (
    <>
      {!loading ? (
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
