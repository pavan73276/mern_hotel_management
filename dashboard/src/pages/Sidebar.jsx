
// src/components/Dashboard.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
