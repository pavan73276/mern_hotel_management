import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaVenusMars, FaLock } from 'react-icons/fa';

const AdminForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="p-8 bg-white shadow-md rounded-lg h-full">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
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
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Register New Admin
                    </button>
                    <button
                        type="button" // This can be linked to another action or form
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Register New Staff
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminForm;
