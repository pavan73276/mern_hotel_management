import React, { useState } from 'react';
import { FaBed, FaTag } from 'react-icons/fa';

const RoomForm = () => {
    const [formData, setFormData] = useState({
        roomNo: '',
        roomType: ''
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
            <h2 className="text-2xl font-bold text-center mb-6">Room Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Room Number */}
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaBed className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        name="roomNo"
                        placeholder="Room Number"
                        value={formData.roomNo}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    />
                </div>

                {/* Room Type */}
                <div className="flex items-center border-b border-gray-300 py-2 mb-4"> {/* Added mb-4 here */}
                    <FaTag className="text-gray-500 mr-3" />
                    <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full px-2 py-1 outline-none"
                        required
                    >
                        <option value="">Select Room Type</option>
                        <option value="Normal">Normal</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>

                {/* Button Section */}
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Add New Room
                    </button>
                    <button
                        type="button" // Set to button type for separate action
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Delete Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoomForm;
