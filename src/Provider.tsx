import React, { createContext, type ReactNode, useContext, useState } from 'react'

export interface AppletContxtType {
  headerTitle: string | undefined
  setHeaderTitle: (title: string | undefined) => void
  headerRightActions: ReactNode | undefined
  setHeaderRightActions: (actions: ReactNode | undefined) => void
}

export const AppletContext = createContext<AppletContxtType | undefined>(undefined)

export const useApplet = () => useContext(AppletContext)

export function AppletProvider(props: { children: React.ReactNode }) {
  const [headerRightActions, setHeaderRightActions] = useState<ReactNode | undefined>(undefined)
  const [headerTitle, setHeaderTitle] = useState<string | undefined>(undefined)

  return (
    <AppletContext.Provider
      value={{
        headerTitle,
        setHeaderTitle,
        headerRightActions,
        setHeaderRightActions
      }}>
      {props.children}
    </AppletContext.Provider>
  )
}
