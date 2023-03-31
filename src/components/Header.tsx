import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '../types'
import Navigation from './Navigation'

interface HeaderProps {
  onMobileMenuClick: () => void
  title: string
  menus: Menu[]
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuClick, title, menus }) => {
  return (
    <div className="bg-white text-gray-900 py-4 px-4 md:px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="md:hidden flex items-center">
            <button
              onClick={onMobileMenuClick}
              aria-label="Toggle menu"
            >
              <svg
                className="fill-current h-6 w-6 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              </svg>
            </button>
          </div>
          <Link
            to="/"
            className="text-xl font-bold uppercase tracking-wider text-blue-400"
          >
            {title}
          </Link>
        </div>
        <Navigation menus={menus} />
      </div>
    </div>
  )
}

export default Header
