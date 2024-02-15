import { useSelector } from 'react-redux'
import Container from './Container'
import Logo from './Logo'
import LogoutBtn from './LogoutBtn'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', path: '/', active: true },
    { name: 'Login', path: '/login', active: !authStatus },
    { name: 'Sign Up', path: '/signup', active: !authStatus },
    { name: 'All Posts', path: '/all-posts', active: authStatus },
    { name: 'Add Post', path: '/add-post', active: authStatus },
  ]

  return (
    <div>
      <Container>
        <div className="flex justify-between">
          {/* Logo */}
          <Link to={'/'}>
            <Logo />
          </Link>
          {/* Nav Items */}
          <nav>
            <ul className="flex gap-4">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`text-sm ${'text-blue-400 hover:text-blue-500'}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </nav>
          {/* Logout */}
          {authStatus && <LogoutBtn />}
        </div>
      </Container>
    </div>
  )
}
