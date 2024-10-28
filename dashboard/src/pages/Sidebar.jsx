import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebarMenu from '../components/adminSidebarMenu';
import StaffSidebarMenu from '../components/staffSidebarMenu';

const Sidebar = ({ role }) => {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      {role === 'admin' ? <AdminSidebarMenu /> : <StaffSidebarMenu /> }

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
