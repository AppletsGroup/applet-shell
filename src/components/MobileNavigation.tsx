import { Link, useNavigate } from 'react-router-dom'
import { type Menu } from '../types'
import { useApplet } from '../Provider'

export default function MobileNavigation ({ onSelectMenu, menus }: { onSelectMenu: () => void, menus: Menu[] }) {
  const applet = useApplet()
  const userProfile = applet?.profile
  const theme = applet?.theme
  const navigate = useNavigate()

  const logOut = () => {
    applet?.logOut()
    navigate('/')
  }

  return (
    <div className="md:hidden flex flex-col min-h-screen pt-4 bg-white dark:bg-gray-900">
      <div className="flex-1">
        <div className="flex items-center justify-center mb-4">
          <img
            className="w-12 h-12 rounded-full cursor-pointer"
            src={`${userProfile?.avatarUrl}!avatar`}
            alt="Avatar" />
          <div className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{userProfile?.name}</div>
        </div>
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block py-2 px-4 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-gray-100"
            onClick={onSelectMenu}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex-shrink-0 mb-4 mx-5">
        <button
          onClick={() => applet?.configTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full mb-2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md dark:bg-white dark:text-gray-800"
        >
          { theme === 'dark' ? 'Light Mode' : 'Dark Mode' }
        </button>
        <button
          onClick={logOut}
          className="w-full py-2 px-4 font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
