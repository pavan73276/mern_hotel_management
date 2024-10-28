import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaDoorOpen,
  FaPlus,
  FaTrashAlt,
  FaBook,
  FaSignOutAlt,
  FaMinus,
} from "react-icons/fa"; // Import icons from react-icons
import { useDispatch } from "react-redux";
import { adminLogout } from "../store/slices/userSlice";

const AdminSidebarMenu = () => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(""); // State to track the active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update active link state
  };

  const handleLogout = () => {
    dispatch(adminLogout());
  }

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="addnew"
                onClick={() => handleLinkClick("addnew")} // Set active link on click
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${
                  activeLink === "addnew" ? "bg-gray-700" : ""
                }`} // Highlight active link
              >
                <FaUserPlus className="mr-2" /> Add New
              </Link>
            </li>
            <li>
              <Link
                to="getallrooms"
                onClick={() => handleLinkClick("getallrooms")}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${
                  activeLink === "getallrooms" ? "bg-gray-700" : ""
                }`}
              >
                <FaDoorOpen className="mr-2" /> Get All Rooms
              </Link>
            </li>
            <li>
              <Link
                to="addroom"
                onClick={() => handleLinkClick("addroom")}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${
                  activeLink === "addroom" ? "bg-gray-700" : ""
                }`}
              >
                <FaPlus className="mr-2" /> Add / Delete Room
              </Link>
            </li>
            <li>
              <Link
                to="getallbookings"
                onClick={() => handleLinkClick("getallbookings")}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${
                  activeLink === "getallbookings" ? "bg-gray-700" : ""
                }`}
              >
                <FaBook className="mr-2" /> Get All Bookings
              </Link>
            </li>
            <li>
              <Link
                to="getallstaffs"
                onClick={() => handleLinkClick("getallstaffs")}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${
                  activeLink === "getallstaffs" ? "bg-gray-700" : ""
                }`}
              >
                <FaBook className="mr-2" /> Get All Staffs
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section (Logout Button) */}
      <div className="p-4 border-t border-gray-700">
        <Link
          onClick={handleLogout}
          className="flex items-center py-2 px-4 rounded hover:bg-red-700"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebarMenu;
