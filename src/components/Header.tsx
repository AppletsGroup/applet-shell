import React from 'react'
import { Link } from 'react-router-dom'
import { type Menu } from '../types'
import Navigation from './Navigation'

interface HeaderProps {
  onMobileMenuClick: () => void
  title: string
  menus: Menu[]
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuClick, title, menus }) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-b h-16 px-4 md:px-8 fixed top-0 left-0 right-0 flex justify-between items-center">
      <div className="flex items-center">
        <div className="md:hidden flex items-center">
          <button
            onClick={onMobileMenuClick}
            aria-label="Toggle menu"
            >
            <svg
              className="fill-current h-6 w-6 text-blue-400 dark:text-blue-300"
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
          className="text-xl font-bold uppercase tracking-wider text-blue-400 dark:text-blue-300"
          >
          {title}
        </Link>
      </div>
      <Navigation menus={menus} />
    </div>
  )
}

export default Header
