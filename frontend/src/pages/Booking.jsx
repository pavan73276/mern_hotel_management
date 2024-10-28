import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailbility } from "../store/slices/bookingSlice";
import Calendar from "../components/Calendar.jsx";
import BookRoom from "../components/BookRoom.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const addonPrices = {
  food: 20,
  swimming: 15,
  gym: 10,
};

const Booking = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [addons, setAddons] = useState({ food: false, swimming: false, gym: false });
  const [totalAddonPrice, setAddonTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const { loading, isAvailable, error } = useSelector(
    (state) => state.booking
  );

  const roomPrice = selectedRoom === "Vip" ? 2000 : 1000; 
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  

  const handleAddonsChange = (updatedAddons) => {
    setAddons(updatedAddons);
  };

  useEffect(() => {
    const newTotalAddonPrice = Object.keys(addons)
    .filter((key) => addons[key])
    .reduce((acc, key) => acc + addonPrices[key], 0);

    setAddonTotalPrice(newTotalAddonPrice * selectedDates.length);

    const newTotalPrice = roomPrice * selectedDates.length + totalAddonPrice;
    setTotalPrice(newTotalPrice);
  }, [addons, totalAddonPrice, selectedDates, totalPrice]);

  const handleBook = (roomType) => {
    setSelectedRoom(roomType);
    setShowCalendar(true);
  };

  const handleBookNow = () => {
    if(selectedDates.length === 0){
      toast.error('select atleast 1 date');
      return;
    }
    navigateTo("/payment", { state: {selectedRoom, selectedDates, addons, totalPrice} });
  };

  const handleFind = (dates) => {
    setSelectedDates(dates);
    if(dates.length === 0){
      toast.error('select atleast 1 date');
      return;
    }
    dispatch(getAvailbility({ dates, roomType: selectedRoom }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {showCalendar ? (
        <>
          {/* Calendar and BookRoom Section */}
          <div className="flex w-full space-x-8 mt-20 ">
            {/* Left - Calendar */}
            <div className="w-3/4 bg-gray p-6 rounded-lg shadow-lg">
              <Calendar onDatesSelected={handleFind} />
            </div>

            {/* Right - Add-ons (BookRoom Component) */}
            <div className=" mr-20 w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <BookRoom selectedRoom={selectedRoom} selectedDates={selectedDates} onAddOnChange={handleAddonsChange} />
              {/* Total Price and Book Now Button */}
              <div className="w-full max-w-5xl mt-8 mb-5">
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-gray-600">Room Price:</span>
                    <span className="text-gray-800">${roomPrice} / a day</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-gray-600">Add-ons Total:</span>
                    <span className="text-gray-800">${totalAddonPrice}</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold text-blue-600">
                    <span>Total Price:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {isAuthenticated 
                  ? (
                  <button
                    className={`w-full py-3 mt-4 text-white font-semibold rounded-md transition ${
                      isAuthenticated
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!isAuthenticated}
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                  )
                  :
                  <p className="text-red-500 text-center mt-2">
                    Please log in to complete the booking.
                  </p>
                }
              </div>
            </div>
          </div>
        </>
      ) : (
        // Room selection cards
        <div className="mt-20 w-full h-[calc(100vh-192px)] flex justify-between space-x-4 px-8">
          {/* Normal Room Card */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-full h-full bg-white p-8 rounded-lg shadow-lg flex flex-col">
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
            <div className="w-full h-full bg-white p-8 rounded-lg shadow-lg flex flex-col">
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
  );
};

export default Booking;
