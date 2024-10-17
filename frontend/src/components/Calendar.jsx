import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Calendar = ({ onDatesSelected }) => {
  const availability = [
    1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 0,
  ];

  const [selectedDates, setSelectedDates] = useState([]);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const dispatch = useDispatch();
  const { loading, isAvailable, error } = useSelector((state) => state.booking);

  const generateDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleDateClick = (index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const dateString = date.toDateString();

    setSelectedDates((prevSelected) => {
      if (prevSelected.includes(dateString)) {
        return prevSelected.filter((d) => d !== dateString);
      } else {
        return [...prevSelected, dateString];
      }
    });
  };

  const handleFindRoomClick = () => {
    const dates = selectedDates.map((date) =>
      new Date(date).toISOString().split("T")[0]
    );
    setAvailabilityChecked(true);
    onDatesSelected(dates); // Pass dates to parent
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-6">Select Dates</h2>
      <div className="grid grid-cols-7 gap-4">
        {generateDates().map((date, index) => {
          const isAvailable = availability[index] === 1;
          const isSelected = selectedDates.includes(date.toDateString());
          return (
            <div
              key={index}
              className={`p-4 border rounded-lg text-center cursor-pointer ${
                isAvailable
                  ? isSelected
                    ? "bg-blue-200 border-blue-500"
                    : "bg-green-200"
                  : "bg-red-200"
              }`}
              onClick={() => isAvailable && handleDateClick(index)}
            >
              <div>
                {date.toLocaleString("default", { month: "long" })}{" "}
                {date.getDate()}
              </div>
              <div className="font-semibold">{availability[index]}</div>
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          onClick={handleFindRoomClick}
          disabled={selectedDates.length === 0}
        >
          Find Room
        </button>
      </div>

      {/* Display availability result after checking */}
      {availabilityChecked && !loading && (
        <div className="mt-6">
          {isAvailable ? (
            <div className="text-green-600 font-bold text-2xl">
              Room is available! 🎉
            </div>
          ) : (
            <div className="text-red-600 font-bold text-2xl">
              Room is not available. 😔
            </div>
          )}
        </div>
      )}

      {/* Loading spinner or message if the request is still in progress */}
      {loading && (
        <div className="mt-6 text-blue-600">Checking availability...</div>
      )}

      {/* Error message if there is an error */}
      {error && <div className="mt-6 text-red-600">Error: {error}</div>}
    </div>
  );
};

export default Calendar;
