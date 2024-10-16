import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import {
  FaRegUser,
  FaPencilAlt,
  FaAddressBook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6"; 
import { MdOutlineMailOutline, MdCategory } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Signup = () => {
  // Form Fields
  const [firstName, setFirstName] = useState(""); // First Name
  const [lastName, setLastName] = useState("");   // Last Name
  const [email, setEmail] = useState("");         // Email
  const [dob, setDob] = useState("");             // Date of Birth
  const [gender, setGender] = useState("");       // Gender
  const [phone, setPhone] = useState("");         // Phone Number
  const [password, setPassword] = useState("");   // Password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password

  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redux States
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // Handle Form Submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Validate Passwords
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Prepare Form Data
    const formData = {
      firstName,
      lastName,
      email,
      dob,
      gender,
      phone,
      password,
    };

    // Dispatch Register Action
    dispatch(register(formData));
  };

  // Handle Side Effects
  useEffect(() => {
    if (error) {
      toast.error(error); // Display Error Message
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("signup successfully");
      navigateTo("/login"); // Redirect to Home on Successful Registration
    }
  }, [dispatch, error, loading, isAuthenticated, message, navigateTo]);

  return (
    <section className="authPage py-12">
      <div className="container mx-auto max-w-md shadow-md bg-white p-8 rounded-md">
        {/* Header */}
        <div className="header text-center mb-6">
          <h3 className="text-2xl font-semibold">Create a New Account</h3>
        </div>
        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          {/* First and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="inputTag">
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            {/* Last Name */}
            <div className="inputTag">
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="inputTag mt-4">
            <label className="block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-2 pl-10"
                required
              />
              <MdOutlineMailOutline className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="inputTag mt-4">
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Gender */}
          <div className="inputTag mt-4">
            <label className="block mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="inputTag mt-4">
            <label className="block mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="111-222-3333"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-md p-2 pl-10"
                required
              />
              <FaPhoneFlip className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Password */}
            <div className="inputTag relative">
              <label className="block mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-2 pr-10"
                required
              />
              {/* <RiLock2Fill className="absolute left-3 top-9 text-gray-500" /> */}
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="inputTag relative">
              <label className="block mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-md p-2 pr-10"
                required
              />
              {/* <RiLock2Fill className="absolute left-3 top-9 text-gray-500" /> */}
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              Already have an account? Login Now
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
