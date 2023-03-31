import { Link } from 'react-router-dom'
import { Menu } from '../types'
import CurrentUser from './CurrentUser'

export default function Navigation ({ menus }: { menus: Menu[] }) {
  return (
    <div className="hidden md:flex items-center">
      {menus.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className="mx-4 hover:text-green-300 transition-colors"
        >
          {label}
        </Link>
      ))}
      <CurrentUser />
    </div>
  )
}
