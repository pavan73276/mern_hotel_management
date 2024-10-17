import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const addonPrices = {
  food: 20,
  swimming: 15,
  gym: 10,
};

const BookRoom = ({ selectedRoom, selectedDates }) => {
  const [addons, setAddons] = useState({ food: false, swimming: false, gym: false });
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleAddonChange = (addon) => {
    setAddons((prevAddons) => ({ ...prevAddons, [addon]: !prevAddons[addon] }));
  };

  const totalAddonPrice = Object.keys(addons)
    .filter((key) => addons[key])
    .reduce((acc, key) => acc + addonPrices[key], 0);

  return (
    <div className="bg-white shadow-lg p-8 rounded-lg space-y-6 mt-20">
      <h2 className="text-3xl font-bold text-gray-800">Book Your Room</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-600">Selected Dates:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {selectedDates.map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-600">Add-ons:</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(addons).map((addon) => (
            <div
              key={addon}
              className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md shadow-md"
            >
              <input
                type="checkbox"
                id={addon}
                checked={addons[addon]}
                onChange={() => handleAddonChange(addon)}
                className="w-5 h-5 text-blue-500 focus:ring-blue-400 rounded"
              />
              <label
                htmlFor={addon}
                className="text-gray-800 font-medium capitalize"
              >
                {addon} (${addonPrices[addon]})
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookRoom;
