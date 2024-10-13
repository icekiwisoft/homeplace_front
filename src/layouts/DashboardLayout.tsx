
import Sidebar from '../components/SideBar/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className=' flex h-screen'>
      {/* <Nav/> */}
      <Sidebar/>
      <div className='flex-1 px-2 overflow-auto bg-gray-200'>
      <Outlet/>
      </div>

    </div>
  )
}

export default DashboardLayout
