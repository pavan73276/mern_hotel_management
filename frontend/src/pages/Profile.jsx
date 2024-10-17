import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { updatePassword } from '../store/slices/userSlice';
import { FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa'; // Import eye and edit icons

const defaultAvatar = ''; // Using empty string for no image case

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(user.profilePic || defaultAvatar);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
        setProfilePic(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }

    dispatch(updatePassword({ currentPassword, newPassword }));

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowPasswordForm(!showPasswordForm);
    toast.success("Password Updated");
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-200 flex flex-col items-center py-20">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-12 space-y-10 relative">
        {/* Profile Header Section */}
        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-8 rounded-lg text-white text-center relative">
          {/* Profile Picture */}
          <div className="relative mx-auto w-32 h-32">
            <div
              className={`w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover absolute inset-0 ${
                !profilePic ? 'bg-light-blue-500' : ''
              }`}
              style={{
                backgroundImage: `url(${previewPic || defaultAvatar})`,
                backgroundSize: 'cover',
                top: '50%', // Position it half in header and half out
                transform: 'translateY(-50%)',
              }}
            ></div>
            {/* Edit option on hover */}
            <label htmlFor="profilePicUpload" className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 bg-black bg-opacity-50 rounded-full">
              <FaEdit className="text-white text-2xl" />
              <input
                id="profilePicUpload"
                type="file"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
          <div className="mt-16 text-center">
            <h2 className="text-4xl font-bold font-serif">{user.firstName.toUpperCase()}</h2>
          </div>
        </div>

        <div className="mt-20 space-y-8">
          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xl font-semibold text-gray-700 font-sans">First Name:</label>
              <span className="block mt-1 text-gray-900 font-serif text-lg">{user.firstName}</span>
            </div>
            <div>
              <label className="block text-xl font-semibold text-gray-700 font-sans">Last Name:</label>
              <span className="block mt-1 text-gray-900 font-serif text-lg">{user.lastName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xl font-semibold text-gray-700 font-sans">Date of Birth:</label>
              <span className="block mt-1 text-gray-900 font-serif text-lg">{user.dob}</span>
            </div>
            <div>
              <label className="block text-xl font-semibold text-gray-700 font-sans">Gender:</label>
              <span className="block mt-1 text-gray-900 font-serif text-lg">{user.gender}</span>
            </div>
          </div>

          <div>
            <label className="block text-xl font-semibold text-gray-700 font-sans">Email:</label>
            <span className="block mt-1 text-gray-900 font-serif text-lg">{user.email}</span>
          </div>
        </div>

        {/* Button to toggle the password form */}
        <div className="text-center">
          <button
            onClick={togglePasswordForm}
            className="bg-indigo-600 text-white font-semibold text-lg px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Password
          </button>
        </div>

        {/* Password Update Section */}
        {showPasswordForm && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg p-8 w-full md:w-2/3 mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 font-serif">Update Password</h3>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-6 relative">
                <label className="block text-lg font-medium text-gray-700 font-sans">Current Password:</label>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-white text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="mb-6 relative">
                <label className="block text-lg font-medium text-gray-700 font-sans">New Password:</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-white text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="mb-6 relative">
                <label className="block text-lg font-medium text-gray-700 font-sans">Confirm New Password:</label>
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-white text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                >
                  {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 w-full transition"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
