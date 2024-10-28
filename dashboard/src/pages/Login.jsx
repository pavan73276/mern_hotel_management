import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllStaffErrors, staffLogin } from "../store/slices/staffSlice.js"; 
import { toast } from "react-toastify";
import { loginAdmin } from '../store/slices/adminSlice.js';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, isAuthenticated, error } = useSelector((state) => state.admin); // Use admin slice here

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAdminlogin = (e) => {
    e.preventDefault();
    
    dispatch(loginAdmin({email, password, role : 'Admin'}));
  }

  const handleStafflogin = (e) => {
    e.preventDefault();
    
    dispatch(staffLogin({email, password, role : 'Staff'}));
  }

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error);
      dispatch(clearAllStaffErrors());
    }
    if (isAuthenticated) {
      toast.success("Login successfully");
      navigateTo("/"); // Redirect to admin dashboard
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo]);


  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section with Faded Background Image */}
      <div
        className="w-full lg:w-3/5 bg-teal-900 flex justify-center items-center relative"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-teal-900 opacity-80"></div> {/* Overlay for fading */}
        <div className="relative z-10 text-center text-white">
          <img src="/logo.png" alt="Bailey and Co." className="w-24 mx-auto mb-4" />
          <h1 className="text-6xl font-semibold">Bailey and Co.</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="bg-white p-8 w-full max-w-lg rounded-xl shadow-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-teal-900">Welcome</h2>
          <p className="text-gray-600 mb-6 text-center">Please login to Admin or Staff Dashboard</p>
          
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassChange}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />

          <div className="flex justify-between gap-4">
            <button onClick={handleAdminlogin} className="w-1/2 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition">
              Admin Login
            </button>
            <button onClick={handleStafflogin} className="w-1/2 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition">
              Staff Login
            </button>
          </div>

          <p className="text-gray-500 mt-6 text-center cursor-pointer hover:underline">
            Forgot Your Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
