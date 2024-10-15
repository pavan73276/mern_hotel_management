import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left Section - Logo and Links */}
          <div className="flex items-center space-x-8">
            {/* Logo Section */}
            <div className="logo">
              <Link to={"/"}>
                <img src="/logo.png" alt="logo" className="w-24" />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className={`hidden md:flex space-x-8`}>
              <Link
                to={"/"}
                className="text-lg text-gray-700 hover:text-blue-600"
                onClick={() => setShow(false)}
              >
                HOME
              </Link>
              <Link
                to={"/jobs"}
                className="text-lg text-gray-700 hover:text-blue-600"
                onClick={() => setShow(false)}
              >
                BOOKINGS
              </Link>
              {isAuthenticated ? (
                <Link
                  to={"/dashboard"}
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={() => setShow(false)}
                >
                  DASHBOARD
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={() => setShow(false)}
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>

          {/* Right Section - Login/SignUp Buttons */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <Link
                to={"/dashboard"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Dashboard
              </Link>
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
                  to={"/jobs"}
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={() => setShow(false)}
                >
                  BOOKINGS
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link
                    to={"/dashboard"}
                    className="text-lg text-gray-700 hover:text-blue-600"
                    onClick={() => setShow(false)}
                  >
                    DASHBOARD
                  </Link>
                </li>
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
