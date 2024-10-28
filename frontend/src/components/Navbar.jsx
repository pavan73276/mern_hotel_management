import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout, MdPerson } from "react-icons/md";
import { logout } from "../store/slices/userSlice"; // Ensure you have a logout action

const Navbar = () => {
  const [show, setShow] = useState(false); // Mobile menu visibility
  const [dropdown, setDropdown] = useState(false); // dashboard dropdown visibility
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference to the dropdown for click outside

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to home after logout
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left Section - Logo and Main Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo Section */}
            <div className="logo">
              <Link to={"/"}>
                <img src="src/assets/logo.png" alt="logo" className="w-24" />
              </Link>
            </div>

            {/* Main Navigation Links */}
            <div className={`hidden md:flex space-x-8`}>
              <Link
                to={"/"}
                className="text-lg text-gray-700 hover:text-blue-600"
                onClick={() => setShow(false)}
              >
                HOME
              </Link>
              <Link
                to={"/booking"}
                className="text-lg text-gray-700 hover:text-blue-600"
                onClick={() => setShow(false)}
              >
                BOOKINGS
              </Link>
              <Link
                to={"/booking"}
                className="text-lg text-gray-700 hover:text-blue-600"
                onClick={() => setShow(false)}
              >
                ABOUT
              </Link>
              {/* Add more main links here if needed */}
            </div>
          </div>


          {/* Right Section - Profile Dropdown or Login/SignUp Buttons */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Avatar */}
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  aria-label="User menu"
                >
                  {user && user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-gray-700" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                    <Link
                      to={"/dashboard"}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdown(false)}
                    >
                      <MdPerson className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <MdLogout className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <GiHamburgerMenu
            className="text-gray-700 text-3xl cursor-pointer md:hidden"
            onClick={() => setShow(!show)}
          />
        </div>

        {/* Mobile Menu */}
        {show && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link
                  to={"/"}
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={() => setShow(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to={"/booking"}
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={() => setShow(false)}
                >
                  BOOKINGS
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to={"/dashboard"}
                      className="flex items-center text-lg text-gray-700 hover:text-blue-600"
                      onClick={() => setShow(false)}
                    >
                      <MdPerson className="mr-2" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShow(false);
                      }}
                      className="flex items-center text-lg text-gray-700 hover:text-blue-600"
                    >
                      <MdLogout className="mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/login"}
                      className="text-lg text-gray-700 hover:text-blue-600"
                      onClick={() => setShow(false)}
                    >
                      LOGIN
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/signup"}
                      className="text-lg text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                      onClick={() => setShow(false)}
                    >
                      SIGN UP
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
