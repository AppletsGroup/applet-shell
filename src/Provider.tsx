import { getProfile } from 'applet-apis'
import { type User } from 'applet-types'
import React, { createContext, type ReactNode, useContext, useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export interface AppletContxtType {
  profile: User | undefined
  theme: string | null
  configTheme: (themeMode: string) => void
  logOut: () => void
  headerTitle: string | undefined
  setHeaderTitle: (title: string | undefined) => void
  headerRightActions: ReactNode | undefined
  setHeaderRightActions: (actions: ReactNode | undefined) => void
  toast: typeof toast
}

export const AppletContext = createContext<AppletContxtType | undefined>(undefined)

export const useApplet = () => useContext(AppletContext)

export function AppletProvider (props: { children: React.ReactNode }) {
  const [headerRightActions, setHeaderRightActions] = useState<ReactNode | undefined>(undefined)
  const [headerTitle, setHeaderTitle] = useState<string | undefined>(undefined)
  const [profile, setProfile] = useState<User | undefined>(undefined)
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    const initUser = async () => {
      const response = await getProfile()
      if (response) {
        setProfile(response)
      }
    }

    void initUser()
  }, [])

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    setTheme(localTheme)

    const meta = document.createElement('meta')
    meta.name = 'apple-mobile-web-app-status-bar-style'
    if (localTheme === 'dark') {
      document.documentElement.classList.add('dark')
      meta.content = 'black-translucent'
    } else {
      document.documentElement.classList.remove('dark')
      meta.content = 'default'
    }
    document.getElementsByTagName('head')[0].appendChild(meta)
  }, [])

  const configTheme = (newThemeMode: string) => {
    setTheme(newThemeMode)
    localStorage.setItem('theme', newThemeMode)
    if (newThemeMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const logOut = () => {
    localStorage.removeItem('TOKEN')
    setProfile(undefined)
  }

  return (
    <AppletContext.Provider
      value={{
        profile,
        logOut,
        theme,
        configTheme,
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
