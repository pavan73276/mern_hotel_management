import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allStays, filterDetails } from '../store/slices/staffSlice';
import { toast } from 'react-toastify';

const CurrentStays = () => {
  const dispatch = useDispatch();
  const { error, stays, loading } = useSelector((state) => state.staff);

  const [filter, setFilter] = useState({
    food: false,
    swimming: false,
    gym: false,
  });

  useEffect(() => {
    // Run allStays only once on component mount
    dispatch(allStays());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: checked,
    }));
  };

  const applyFilter = () => {
    dispatch(filterDetails(filter));
  };

  const hasStays = stays && typeof stays === 'object' && Object.keys(stays).length > 0;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Current Stays</h2>

      {/* Filter Form */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="food"
            checked={filter.food}
            onChange={handleFilterChange}
            className="form-checkbox text-blue-500"
          />
          <span>Food</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="swimming"
            checked={filter.swimming}
            onChange={handleFilterChange}
            className="form-checkbox text-blue-500"
          />
          <span>Swimming</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="gym"
            checked={filter.gym}
            onChange={handleFilterChange}
            className="form-checkbox text-blue-500"
          />
          <span>Gym</span>
        </label>
        <button
          onClick={applyFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : hasStays ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-300 rounded-lg shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-blue-300 rounded-tl-lg">Serial No.</th>
                <th className="py-3 px-4 border-b border-blue-300">Room ID</th>
                <th className="py-3 px-4 border-b border-blue-300">User ID</th>
                <th className="py-3 px-4 border-b border-blue-300 rounded-tr-lg">Check-In Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stays).map(([key, stay], index) => (
                <tr key={stay._id} className="hover:bg-blue-100 transition duration-200">
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{stay.roomid}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{stay.userid}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">
                    {stay.checkIn ? "Checked In" : "Not Checked In"}
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
};

export default CurrentStays;
