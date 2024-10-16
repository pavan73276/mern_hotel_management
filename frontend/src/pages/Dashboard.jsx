// src/components/Dashboard.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
