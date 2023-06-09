import { useState, useEffect, Suspense, useRef } from 'react'
import { Outlet, ScrollRestoration, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Drawer from '../components/Drawer'
import MobileNavigation from '../components/MobileNavigation'
import { type Menu } from '../types'
import Loading from '../components/Loading'

export interface DefaultLayoutProps {
  menus: Menu[]
  title: string
}

export function DefaultLayout ({ menus, title }: DefaultLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const token = searchParams.get('token')
  if (token) {
    localStorage.setItem('TOKEN', token)
  }

  useEffect(() => {
    const element = drawerRef.current

    let startX: number | null = null

    const handleTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (startX === null) {
        return
      }

      const currentX = event.touches[0].clientX
      const diff = currentX - startX

      if (diff > 100) {
        setDrawerOpen(true)
      } else if (diff < -100) {
        setDrawerOpen(false)
      }
    }

    const handleTouchEnd = () => {
      startX = null
    }

    element?.addEventListener('touchstart', handleTouchStart)
    element?.addEventListener('touchmove', handleTouchMove)
    element?.addEventListener('touchend', handleTouchEnd)

    return () => {
      element?.removeEventListener('touchstart', handleTouchStart)
      element?.removeEventListener('touchmove', handleTouchMove)
      element?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [drawerRef])

  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

    return () => {
      window.removeEventListener('resize', () => {})
      document.documentElement.style.removeProperty('--vh')
    }
  }, [])

  useEffect(() => {
    if (token) {
      searchParams.delete('token')
      setSearchParams(searchParams)
    }
  }, [])

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const closeDrawer = () => {
    if (drawerOpen) setDrawerOpen(false)
  }

  return (
    <div
      ref={drawerRef}
      className="h-inner-height pt-16">
      <div onClick={closeDrawer}>
        <Header
          onMobileMenuClick={toggleDrawer}
          title={title}
          menus={menus} />
      </div>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}>
        <MobileNavigation
          onSelectMenu={closeDrawer}
          menus={menus} />
      </Drawer>
      <AnimatePresence>
        {drawerOpen && (
          <motion.div

            initial={{ x: 0 }}
            animate={{ x: 250 }}
            exit={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-inner-height"
          >
            <div
              className="absolute inset-0 bg-white dark:bg-black opacity-25"
              onClick={closeDrawer}>
            </div>
            <Outlet />
          </motion.div>
        )}
        {!drawerOpen && (<Suspense fallback={<Loading />}><Outlet /></Suspense>)}
      </AnimatePresence>
      <ScrollRestoration />
    </div>
  )
}
