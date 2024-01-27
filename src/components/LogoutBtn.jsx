import { useDispatch } from 'react-redux'
import authService from '../appwrite/authService'
import { logout } from '../redux/authSlice'
import Button from './Button'

export default function LogoutBtn() {
  const dispatch = useDispatch()

  const handelLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return <Button onClick={handelLogout}>Logout</Button>
}
