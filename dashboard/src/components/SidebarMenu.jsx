import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaDoorOpen, FaPlus, FaTrashAlt, FaBook, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons

const SidebarMenu = () => {
    const [activeLink, setActiveLink] = useState(''); // State to track the active link

    const handleLinkClick = (link) => {
        setActiveLink(link); // Update active link state
    };

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
                                to="addnewadmin"
                                onClick={() => handleLinkClick('addnewadmin')} // Set active link on click
                                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${activeLink === 'addnewadmin' ? 'bg-gray-700' : ''}`} // Highlight active link
                            >
                                <FaUserPlus className="mr-2" /> Add New Admin
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="addnewstaff"
                                onClick={() => handleLinkClick('addnewstaff')}
                                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${activeLink === 'addnewstaff' ? 'bg-gray-700' : ''}`}
                            >
                                <FaUsers className="mr-2" /> Add New Staff
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="getallrooms"
                                onClick={() => handleLinkClick('getallrooms')}
                                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${activeLink === 'getallrooms' ? 'bg-gray-700' : ''}`}
                            >
                                <FaDoorOpen className="mr-2" /> Get All Rooms
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="addroom"
                                onClick={() => handleLinkClick('addroom')}
                                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${activeLink === 'addroom' ? 'bg-gray-700' : ''}`}
                            >
                                <FaPlus className="mr-2" /> Add Room
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="deleteroom"
                                onClick={() => handleLinkClick('deleteroom')}
                                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${activeLink === 'deleteroom' ? 'bg-gray-700' : ''}`}
                            >
                                <FaTrashAlt className="mr-2" /> Delete Room
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="getallbookings"
                                onClick={() => handleLinkClick('getallbookings')}
                                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${activeLink === 'getallbookings' ? 'bg-gray-700' : ''}`}
                            >
                                <FaBook className="mr-2" /> Get All Bookings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Bottom Section (Logout Button) */}
            <div className="p-4 border-t border-gray-700">
                <Link
                    to="/logout"
                    className="flex items-center py-2 px-4 rounded hover:bg-red-700"
                >
                    <FaSignOutAlt className="mr-2" /> Logout
                </Link>
            </div>
        </div>
    );
};

export default SidebarMenu;
