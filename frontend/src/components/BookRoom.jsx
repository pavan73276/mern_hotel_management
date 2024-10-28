import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const addonPrices = {
  food: 20,
  swimming: 15,
  gym: 10,
};

const BookRoom = ({ selectedRoom, selectedDates, onAddOnChange }) => {
  const [addons, setAddons] = useState({ food: false, swimming: false, gym: false });
  const { isAuthenticated } = useSelector((state) => state.user);
  
  const handleAddonChange = (addon) => {
    const updatedAddons = {
      ...addons,
      [addon]: !addons[addon]
    }
    setAddons(updatedAddons);
    onAddOnChange(updatedAddons);
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-lg space-y-6 mt-20">
      <h2 className="text-3xl font-bold text-gray-800">Book Your Room</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-600">Selected Dates:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedDates.map((date) => (
            <div
              key={date}
              className="px-4 py-2 bg-blue-100 text-gray-800 rounded-lg shadow-md"
            >
              {date}
            </div>
          ))}
        </div>
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
