import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { appletStore } from 'applet-store'
import { Provider } from 'react-redux'

import { AppletProvider,  DefaultLayout, SubPageLayout } from '../../src/index'
import LandingPage from './pages/LandingPage'
import DetailPage from './pages/DetailPage'

const menus = [
  { path: '/', label: 'Home' },
  { path: '/books', label: 'Books' }
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        element={(
          <DefaultLayout
            menus={menus}
            title={'Book'}/>
        )}
      >
        <Route
          path="/"
          element={<LandingPage />} />
      </Route>
      <Route element={<SubPageLayout />}>
        <Route
          path="/books/:bookId"
          element={<DetailPage />} />
      </Route>
    </Route>
  )
)

const App: React.FC = () => {
  return (
    <AppletProvider>
      <Provider store={appletStore}>
        <RouterProvider router={router} />
      </Provider>
    </AppletProvider>
  )
}

export default App
