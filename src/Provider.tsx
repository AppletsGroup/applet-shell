import { getProfile } from 'applet-apis'
import { User } from 'applet-types'
import React, { createContext, type ReactNode, useContext, useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export interface AppletContxtType {
  profile: User | undefined
  logOut: () => void
  headerTitle: string | undefined
  setHeaderTitle: (title: string | undefined) => void
  headerRightActions: ReactNode | undefined
  setHeaderRightActions: (actions: ReactNode | undefined) => void
  toast: typeof toast
}

export const AppletContext = createContext<AppletContxtType | undefined>(undefined)

export const useApplet = () => useContext(AppletContext)

export function AppletProvider(props: { children: React.ReactNode }) {
  const [headerRightActions, setHeaderRightActions] = useState<ReactNode | undefined>(undefined)
  const [headerTitle, setHeaderTitle] = useState<string | undefined>(undefined)
  const [profile, setProfile] = useState<User | undefined>(undefined)

  useEffect(() => {
    const initUser = async () => {
      const response = await getProfile()
      if (response) {
        setProfile(response)
      }
    }

    initUser()
  }, [])

  const logOut = () => {
    localStorage.removeItem('TOKEN')
    setProfile(undefined)
  }
  
  return (
    <AppletContext.Provider
      value={{
        profile,
        logOut,
        headerTitle,
        setHeaderTitle,
        headerRightActions,
        setHeaderRightActions,
        toast
      }}>
      {props.children}
      <Toaster />
    </AppletContext.Provider>
  )
}
