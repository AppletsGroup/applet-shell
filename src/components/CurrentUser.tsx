import { Dropdown } from 'applet-design'
import { Link, useNavigate } from 'react-router-dom'
import { useApplet } from '../Provider'

export default function CurrentUser () {
  const applet = useApplet()
  const navigate = useNavigate()

  const userProfile = applet?.profile

  const logOut = () => {
    applet?.logOut()
    navigate('/')
  }

  const handleGotoAuthPage = () => {
    window.location.href = `https://auth.applets.group?redirectUrl=${location.href}`
  }

  if (!userProfile) {
    return (
      <div
        onClick={handleGotoAuthPage}
        className="cursor-pointer py-3 text-gray-300 font-bold">
        Log in
      </div>
    )
  }

  return (
    <Dropdown
      overlay={(
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Link
              to="/account"
              className="block w-full px-4 py-2 text-left text-sm text-gray-300"
            >
              Account
            </Link>
            <button
              onClick={logOut}
              className='text-gray-300 block w-full px-4 py-2 text-left text-sm bg-gray-800'
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    >
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full cursor-pointer mr-2 bg-gray-900"
          src={userProfile?.avatarUrl + '!avatar'}
          alt="Avatar" />
        <svg
          className="w-4 h-4 text-gray-400 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Dropdown>
  )
}
