import React from 'react'
import Nav from '../components/Header/Nav/Nav'
import Sidebar from '../components/SideBar/Sidebar'
import Fourniture from '../components/Dashboardcontent/Fourniture'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className=' flex h-screen'>
      {/* <Nav/> */}
      <Sidebar/>
      <div className='flex-1 overflow-auto'>
      <Outlet/>
      </div>

    </div>
  )
}

export default Dashboard
