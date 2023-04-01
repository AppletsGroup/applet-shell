import { useEffect } from 'react'
import { useApplet } from '../../../src'

export default function DetailPage() {
  const applet = useApplet()

  useEffect(() => {
    if (applet) applet?.setHeaderTitle('1111')
  }, [])

  return (
    <div>detail page...</div>
  )
}