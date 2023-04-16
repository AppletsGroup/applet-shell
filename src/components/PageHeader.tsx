import { type ReactNode, useEffect, useState } from 'react'
import { useApplet } from '../Provider'

interface PageHeaderProps {
  headerTitle: string | undefined
  headerRightActions: ReactNode | undefined
}

export function PageHeader ({ headerTitle, headerRightActions }: PageHeaderProps) {
  const applet = useApplet()
  const [hasConfigNavigation, setHasConfigNavigation] = useState(false)

  useEffect(() => {
    if (applet != null && !hasConfigNavigation) {
      applet.setHeaderTitle(headerTitle)
      applet.setHeaderRightActions(headerRightActions)
      setHasConfigNavigation(true)
    }

    return () => {
      if (applet != null && hasConfigNavigation) {
        applet.setHeaderTitle(undefined)
        applet.setHeaderRightActions(<></>)
      }
    }
  }, [applet])

  return (
    <></>
  )
}
