import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
const Layout = () => {
  return (
    <div className='flex flex-row'>
        <div className='w-1/4'>
            <Sidebar/>
        </div>
        <main className='w-3/4 bg-gray-300 '>
            <Outlet/>
        </main>

    </div>
  )
}

export default Layout
