import React from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode // Add children prop to support passing drawer content
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  // Add your dra wer implementation here
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Render passed children as drawer content */}
      {children}
      {/* <button className="p-4 text-white bg-blue-500 hover:bg-blue-600" onClick={onClose}>Close</button> */}
    </div>
  )
}

export default Drawer
