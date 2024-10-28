import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AllRooms } from '../store/slices/adminSlice'; // Replace with the actual path to action
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GetAllRooms = () => {
  const dispatch = useDispatch();
  const { error, loading, allrooms } = useSelector((state) => state.admin);
  const [selectedDate, setSelectedDate] = useState(null); // Store a single selected date

  useEffect(() => {
    dispatch(AllRooms());
  }, [dispatch]); // Run this only on mount

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]); // Handle error separately

  // Function to calculate difference in days
  const getDifferenceInDays = (date) => {
    if (!date) return null;

    const selectedTimestamp = new Date(date).getTime();
    const currentTimestamp = new Date().getTime(); // Get current date in timestamp
    const differenceInMilliseconds = selectedTimestamp - currentTimestamp;

    // Calculate difference in days
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {loading ? (
        <p className="text-center text-xl text-gray-700">Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-3 px-4 border-b text-left">S.No</th>
              <th className="py-3 px-4 border-b text-left">Room ID</th>
              <th className="py-3 px-4 border-b text-left">Room No.</th>
              <th className="py-3 px-4 border-b text-left">Room Type</th>
              <th className="py-3 px-4 border-b text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {allrooms && Object.values(allrooms).map((room, index) => (
              <tr key={room._id} className="hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">{room._id}</td>
                <td className="py-3 px-4 border-b">{room.roomNo}</td>
                <td className="py-3 px-4 border-b">{room.type}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center space-x-2">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date); // Set the same date for all rooms
                      }}
                      filterDate={(date) => {
                        const today = new Date();
                        const next30Days = Array.from({ length: 30 }, (_, i) => {
                          const futureDate = new Date(today);
                          futureDate.setDate(today.getDate() + i);
                          return futureDate.toLocaleDateString();
                        });
                        return next30Days.includes(date.toLocaleDateString());
                      }}
                      placeholderText="Select a date"
                      dateFormat="MM/dd/yyyy"
                      className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {selectedDate && (
                      <div
                        className={`p-2 text-white rounded-lg ${
                          getDifferenceInDays(selectedDate) >= 0 &&
                          getDifferenceInDays(selectedDate) < room.availability.length
                            ? room.availability[getDifferenceInDays(selectedDate)]
                              ? 'bg-green-500'
                              : 'bg-red-500'
                            : 'bg-gray-500'
                        }`}
                      >
                        {getDifferenceInDays(selectedDate) >= 0 &&
                        getDifferenceInDays(selectedDate) < room.availability.length
                          ? room.availability[getDifferenceInDays(selectedDate)]
                            ? 'Available'
                            : 'Not Available'
                          : 'Invalid Date'}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllRooms;
