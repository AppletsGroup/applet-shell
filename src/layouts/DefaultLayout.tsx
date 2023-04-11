import { useState, useEffect, Suspense } from 'react'
import { Outlet, ScrollRestoration, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Drawer from '../components/Drawer'
import MobileNavigation from '../components/MobileNavigation'
import { Menu } from '../types'

export interface DefaultLayoutProps {
  menus: Menu[];
  title: string;
}

export function DefaultLayout ({ menus, title }: DefaultLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const token = searchParams.get('token')
  if (token) {
    localStorage.setItem('TOKEN', token)
  }

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
    setDrawerOpen(false)
  }

  return (
    <>
      <Header onMobileMenuClick={toggleDrawer} title={title} menus={menus} />
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}>
        <MobileNavigation onSelectMenu={closeDrawer} menus={menus} />
      </Drawer>
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 250 }}
            exit={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div
              className="absolute inset-0 bg-black opacity-5"
              onClick={closeDrawer}></div>
            <Outlet />
          </motion.div>
        )}
        {!drawerOpen && (<Suspense fallback={<div>loading...</div>}><Outlet /></Suspense>)}
      </AnimatePresence>
      <ScrollRestoration />
    </>
  )
}
