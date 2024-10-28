import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllBookings } from '../store/slices/adminSlice';

const AllBookings = () => {
  const dispatch = useDispatch();
  const { error, bookings, loading } = useSelector((state) => state.admin);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [hoveredRoomId, setHoveredRoomId] = useState(null);
  const [hoverBoxPosition, setHoverBoxPosition] = useState({ top: 0, left: 0 });
  const [userDetails, setUserDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const hasBookings = bookings && typeof bookings === 'object' && Object.keys(bookings).length > 0;

  const showUserHoverBox = (event, user) => {
    const { clientX, clientY } = event;
    setHoverBoxPosition({ top: clientY + 10, left: clientX });
    setHoveredUserId(user.userId);
    setUserDetails(user);
  };

  const showRoomHoverBox = (event, room) => {
    const { clientX, clientY } = event;
    setHoverBoxPosition({ top: clientY + 10, left: clientX });
    setHoveredRoomId(room.roomId);
    setRoomDetails(room);
  };

  const hideHoverBox = () => {
    setHoveredUserId(null);
    setHoveredRoomId(null);
    setUserDetails(null);
    setRoomDetails(null);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      {loading ? (
        <div>Loading...</div>
      ) : hasBookings ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-300 rounded-lg shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-blue-300 rounded-tl-lg">Serial No.</th>
                <th className="py-3 px-4 border-b border-blue-300">User ID</th>
                <th className="py-3 px-4 border-b border-blue-300">Room ID</th>
                <th className="py-3 px-4 border-b border-blue-300">Booking Dates</th>
                <th className="py-3 px-4 border-b border-blue-300">Add-Ons</th>
                <th className="py-3 px-4 border-b border-blue-300 rounded-tr-lg">Payment Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bookings).map(([key, booking], index) => (
                <tr key={booking._id} className="hover:bg-blue-100 transition duration-200">
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{index + 1}</td>
                  <td
                    className="py-3 px-4 border-b border-blue-300 text-center cursor-pointer relative"
                    onMouseEnter={(event) => showUserHoverBox(event, booking.user)}
                    onMouseLeave={hideHoverBox}
                  >
                    {booking.user.userId}
                  </td>
                  <td
                    className="py-3 px-4 border-b border-blue-300 text-center cursor-pointer relative"
                    onMouseEnter={(event) => showRoomHoverBox(event, booking.room)}
                    onMouseLeave={hideHoverBox}
                  >
                    {booking.room?.roomId || 'N/A'}
                  </td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">
                    {booking.bookingDates.map((date, idx) => (
                      <span key={idx} className="inline-block bg-green-100 text-green-800 rounded-full px-2 py-1 text-sm mr-2">
                        {new Date(date).toLocaleDateString()}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">
                    {Object.entries(booking.addOns)
                      .filter(([key]) => key !== '_id' && booking.addOns[key])
                      .map(([key]) => (
                        <span key={key} className={`inline-block rounded-full px-2 py-1 text-sm mr-2 ${key === 'food' ? 'bg-yellow-200 text-yellow-800' : key === 'gym' ? 'bg-blue-200 text-blue-800' : 'bg-red-200 text-red-800'}`}>
                          {key}
                        </span>
                      ))}
                  </td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">
                    <p>Payment Date: {new Date(booking.paymentDetails.paymentDate).toLocaleDateString()}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No bookings available.</div>
      )}
      {hoveredUserId && userDetails && (
        <div
          className="absolute z-10 bg-gray-200 border border-gray-300 p-2 rounded-md shadow-lg"
          style={{ top: hoverBoxPosition.top, left: hoverBoxPosition.left }}
        >
          <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Gender:</strong> {userDetails.gender}</p>
        </div>
      )}
      {hoveredRoomId && roomDetails && (
        <div
          className="absolute z-10 bg-gray-200 border border-gray-300 p-2 rounded-md shadow-lg"
          style={{ top: hoverBoxPosition.top, left: hoverBoxPosition.left }}
        >
          <p><strong>Room No:</strong> {roomDetails.roomNo || 'N/A'}</p>
          <p><strong>Room Type:</strong> {roomDetails.roomType || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
