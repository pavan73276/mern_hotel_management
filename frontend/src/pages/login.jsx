import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'User'
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

    // Handle Side Effects
    useEffect(() => {
      if (error) {
        console.log(error);
        toast.error(error); // Display Error Message
        dispatch(clearAllUserErrors());
      }
      if (isAuthenticated) {
        toast.success("login successfully");
        navigateTo("/"); // Redirect to Home on Successful Registration
      }
    }, [dispatch, error, loading, isAuthenticated, message, navigateTo]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Log In</h2>
        
        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Password Input with Show/Hide Feature */}
        <div className="relative w-full mb-6">
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show the correct icon */}
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Log In
        </button>

        {/* Signup Link */}
        <p className="text-center mt-4 text-gray-500">
          New here? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
