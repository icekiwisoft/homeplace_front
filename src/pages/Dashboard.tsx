import React from 'react'
import Nav from '../components/Header/Nav/Nav'
import Sidebar from '../components/SideBar/Sidebar'
import Fourniture from '../components/Dashboardcontent/Fourniture'

const Dashboard = () => {
  return (
    <>
      {/* <Nav/> */}
      <Sidebar/>
      <Fourniture/>
    </>
  )
}

export default Dashboard
