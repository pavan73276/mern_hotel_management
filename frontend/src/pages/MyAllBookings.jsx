import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showMyAllBookings } from "../store/slices/bookingSlice";

export default function MyAllBookings() {
  const dispatch = useDispatch();
  const { allMyBookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(showMyAllBookings());
  }, [dispatch]);

 
  return (
    <>
      <div className="mt-20">
        <h1 className="text-3xl font-bold mb-6">My All Bookings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMyBookings.length > 0 ? (
            allMyBookings.map((booking, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-[#AD8B3A] mb-2">
                  Room No: {booking.roomNo}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Room Type:</strong> {booking.roomType}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Booking Dates:</strong> {booking.bookingDates}
                </p>

                {booking.addons && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-[#AD8B3A] mb-1">
                      Add-ons:
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {booking.addons.food && <li>Food</li>}
                      {booking.addons.gym && <li>Gym</li>}
                      {booking.addons.swimming && <li>Swimming</li>}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700">No current bookings available.</p>
          )}
        </div>
      </div>
    </>
  );
}
