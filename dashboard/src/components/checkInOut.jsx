import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allStays, checkIn, checkOut } from '../store/slices/staffSlice'; // Ensure allStays is correctly defined in your slice
import { toast } from 'react-toastify';

export default function CheckInOut() {
  const dispatch = useDispatch();
  const { error, stays, loading } = useSelector((state) => state.staff);

  console.log(stays)
  useEffect(() => {
    dispatch(allStays());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCheckIn = (bookingid) => {
    // console.log(`Checking in for booking ID: ${bookingid}`);
    dispatch(checkIn({bookingid}));
  };

  const handleCheckOut = (bookingid) => {
    // console.log(`Checking out for booking ID: ${bookingid}`);
    // Place your check-out logic here, like dispatching another action or making an API call
    dispatch(checkOut({bookingid}));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Check In / Check Out</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : stays && Object.keys(stays).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 rounded-tl-lg">Serial No.</th>
                <th className="py-3 px-4 border-b border-gray-300">Room ID</th>
                <th className="py-3 px-4 border-b border-gray-300">Booking ID</th>
                <th className="py-3 px-4 border-b border-gray-300">Check-In</th>
                <th className="py-3 px-4 border-b border-gray-300 rounded-tr-lg">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stays).map(([key, stay], index) => (
                <tr key={stay._id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4 border-b border-gray-300 text-center">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">{stay.roomid}</td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">{stay.bookingid}</td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    {stay.checkIn ? (
                      "Checked In"
                    ) : (
                      <button
                        onClick={() => handleCheckIn(stay.bookingid)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Check In
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    {stay.checkOut === "toBeCheckedOut" ? (
                      <button
                        onClick={() => handleCheckOut(stay.bookingid)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Check Out
                      </button>
                    ) : (
                      stay.checkOut || ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No current stays available.</div>
      )}
    </div>
  );
}
