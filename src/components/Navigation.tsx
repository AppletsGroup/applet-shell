import { Link } from 'react-router-dom'
import { Menu } from '../types'
import CurrentUser from './CurrentUser'
import { useApplet } from '../Provider'
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Navigation ({ menus }: { menus: Menu[] }) {
  const applet = useApplet()
  const theme = applet?.theme

  return (
    <div className="hidden md:flex items-center">
      {menus.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className="mx-4 hover:text-green-300 dark:hover:text-green-500 transition-colors"
        >
          {label}
        </Link>
      ))}
      <button
        className="mx-4 text-gray-800 dark:text-white font-medium py-2 px-4 transition-colors"
        onClick={() => applet?.configTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>
      <CurrentUser />
    </div>
  )
}
