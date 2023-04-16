import { Outlet, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useApplet } from '../Provider'
import { Suspense } from 'react'
import Loading from '../components/Loading'

export function SubPageLayout () {
  const navigate = useNavigate()
  const applet = useApplet()

  const navigteBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="h-12 flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-900">
        <div
          onClick={navigteBack}
          className="cursor-pointer text-gray-600 dark:text-white flex items-center">
          <FiArrowLeft
            className="inline-block mr-2 dark:text-gray-300"
            size="20" />
        </div>
        <h1 className="text-lg font-semibold flex justify-center items-center flex-1 mr-auto ml-auto dark:text-white">{applet?.headerTitle}</h1>
        <div id="right-actions">
          {applet?.headerRightActions}
        </div>
      </div>
      <Suspense fallback={<Loading />}><Outlet /></Suspense>
    </>

  )
}
