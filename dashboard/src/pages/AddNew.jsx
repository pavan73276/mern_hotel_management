import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaVenusMars, FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { addNewAdmin, addNewStaff } from '../store/slices/adminSlice';
import {Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        password: ''
    });

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dob: '',
            gender: '',
            password: ''
        });
    };

    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const { loading, error } = useSelector((state) => state.admin);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isFormValid = () => {
        return formData.firstName && formData.lastName && formData.email && formData.phone &&
            formData.dob && formData.gender && formData.password;
    };

    // Function to handle adding a new admin
    const handleAddNewAdmin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(addNewAdmin(formData));
        }
    };

    // Function to handle adding a new staff
    const handleAddNewStaff = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(addNewStaff(formData));
        }
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
        }
        if(loading){
            toast.loading();
        }
    }, [error, loading])
      
    return (
        <div className="p-8 bg-white shadow-md rounded-lg h-full">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Registration</h2>
            <form className="space-y-4">
                {/* First Name */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaUser className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaUser className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaEnvelope className="text-gray-500 mr-3" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    />
                </div>

                {/* Phone */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaPhone className="text-gray-500 mr-3" />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    />
                </div>

                {/* Date of Birth */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaCalendarAlt className="text-gray-500 mr-3" />
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaVenusMars className="text-gray-500 mr-3" />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Password */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaLock className="text-gray-500 mr-3" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    />
                </div>

                {/* Button Section */}
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                         onClick={handleAddNewAdmin}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Register New Admin
                    </button>
                    <button
                        type="button"
                         onClick={handleAddNewStaff}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Register New Staff
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewForm;
