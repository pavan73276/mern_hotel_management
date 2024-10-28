import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllStaff } from '../store/slices/adminSlice';

const AllStaffs = () => {
  const dispatch = useDispatch();
  const { error, staffs, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const hasStaffs = staffs && typeof staffs === 'object' && Object.keys(staffs).length > 0;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Staffs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : hasStaffs ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-300 rounded-lg shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-blue-300 rounded-tl-lg">Serial No.</th>
                <th className="py-3 px-4 border-b border-blue-300">ID</th>
                <th className="py-3 px-4 border-b border-blue-300">First Name</th>
                <th className="py-3 px-4 border-b border-blue-300">Last Name</th>
                <th className="py-3 px-4 border-b border-blue-300">Gender</th>
                <th className="py-3 px-4 border-b border-blue-300">Phone</th>
                <th className="py-3 px-4 border-b border-blue-300 rounded-tr-lg">Email</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(staffs).map(([key, staff], index) => (
                <tr key={staff._id} className="hover:bg-blue-100 transition duration-200">
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{staff._id}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{staff.firstName}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{staff.lastName}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{staff.gender}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{staff.phone}</td>
                  <td className="py-3 px-4 border-b border-blue-300 text-center">{staff.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No staff available.</div>
      )}
    </div>
  );
};

export default AllStaffs;
