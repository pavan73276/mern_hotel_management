import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Calendar from "../components/Calendar.jsx"; // Import the Calendar component

const Booking = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility

  const handleBook = (roomType) => {
    setSelectedRoom(roomType);
    setShowCalendar(true); // Show the calendar when a room is booked
  };

  const handleDateSelected = (date) => {
    // Handle date selection logic, e.g., send date to backend
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content area between Navbar and Footer */}
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        {showCalendar ? (
          // Render the Calendar component when a room is booked
          <Calendar selectedRoom={selectedRoom} />
        ) : (
          // Room selection cards
          <div className="mt-16 w-full h-[calc(100vh-192px)] flex justify-between space-x-4 px-8">
            {/* Normal Room Card */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full h-full bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50 duration-300 ease-in-out flex flex-col">
                <img
                  src="src/assets/rooms/normal.jpeg"
                  alt="Normal Room"
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">Normal Room</h3>
                <p className="text-gray-600 mb-4">
                  Comfortable and affordable room for a relaxing stay.
                </p>
                <button
                  className="mt-auto bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                  onClick={() => handleBook("Normal")}
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Deluxe Room Card */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full h-full bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50 duration-300 ease-in-out flex flex-col">
                <img
                  src="src/assets/rooms/deluxe.jpeg"
                  alt="Deluxe Room"
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">Deluxe Room</h3>
                <p className="text-gray-600 mb-4">
                  Luxurious room with premium amenities for a perfect stay.
                </p>
                <button
                  className="mt-auto bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                  onClick={() => handleBook("Vip")}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
