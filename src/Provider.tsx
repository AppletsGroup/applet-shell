import React, { createContext, type ReactNode, useContext, useState } from 'react'

export interface NavigationContxtType {
  headerTitle: string | undefined
  setHeaderTitle: (title: string | undefined) => void
  headerRightActions: ReactNode | undefined
  setHeaderRightActions: (actions: ReactNode | undefined) => void
}

export const NavigationContext = createContext<NavigationContxtType | undefined>(undefined)

export const useAppletNavigation = () => useContext(NavigationContext)

export default function NavigationProvider(props: { children: React.ReactNode }) {
  const [headerRightActions, setHeaderRightActions] = useState<ReactNode | undefined>(undefined)
  const [headerTitle, setHeaderTitle] = useState<string | undefined>(undefined)

  return (
    <NavigationContext.Provider
      value={{
        headerTitle,
        setHeaderTitle,
        headerRightActions,
        setHeaderRightActions
      }}>
      {props.children}
    </NavigationContext.Provider>
  )
}
