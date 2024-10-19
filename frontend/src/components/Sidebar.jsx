// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaBook, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? 'flex items-center p-2 my-2 text-white bg-blue-600 rounded-lg'
      : 'flex items-center p-2 my-2 text-gray-700 hover:bg-gray-200 rounded-lg';

  return (
    <div className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <nav className="mt-10">
        <NavLink to="profile" className={navLinkClasses}>
          <FaUser className="mr-3" />
          Profile
        </NavLink>
        <NavLink to="currentbooking" className={navLinkClasses}>
          <FaBook className="mr-3" />
          Current Booking
        </NavLink>
        <NavLink to="myallbooking" className={navLinkClasses}>
          <FaClipboardList className="mr-3" />
          My All Bookings
        </NavLink>
        <NavLink to="changePassword" className={navLinkClasses}>
          <FaClipboardList className="mr-3" />
          Change Password
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;