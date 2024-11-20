import React from 'react';
import { Outlet } from 'react-router-dom';

import Fourniture from '../components/Dashboardcontent/Fourniture';
import Nav from '../components/Header/Nav/Nav';
import Sidebar from '../components/SideBar/Sidebar';

function DashboardLayout() {
  return (
    <div className=' flex h-screen'>
      {/* <Nav/> */}
      <Sidebar />
      <div className='flex-1 px-2 overflow-auto bg-gray-200'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
