import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, user } from 'applet-store'
import { Menu } from '../types'

const { logout } = user

export default function MobileNavigation ({ onSelectMenu, menus }: { onSelectMenu: () => void, menus: Menu[] }) {
  const userProfile = useAppSelector((state) => state.user.profile)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logOut = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="md:hidden flex flex-col min-h-screen pt-4 bg-white">
      <div className="flex-1">
        <div className="flex items-center justify-center mb-4">
          <img
            className="w-12 h-12 rounded-full cursor-pointer"
            src={`${userProfile?.avatarUrl}!avatar`}
            alt="Avatar" />
          <div className="ml-4 text-lg font-semibold">{userProfile?.name}</div>
        </div>
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block py-2 px-4 hover:bg-gray-700 transition-colors"
            onClick={onSelectMenu}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex-shrink-0 mb-4">
        <button
          onClick={logOut}
          className="w-full py-2 px-4 font-semibold transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
