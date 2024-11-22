import React from 'react';
import { Outlet } from 'react-router-dom';

import Fourniture from '../components/Dashboardcontent/Fourniture';

function DashboardLayout() {
  return (
    <div className=' flex h-screen'>
      <div className='flex-1 px-2 overflow-auto bg-gray-200'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
