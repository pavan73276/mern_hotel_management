import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [dob, setDob] = useState(user.dob);
  const [gender, setGender] = useState(user.gender);
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(user.profilePic || '');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically dispatch an action to save the updated details
    console.log('Updated Details:', { firstName, lastName, dob, gender, profilePic });
    setIsEditing(false);
  };

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

  return (
    <div className="container mx-auto px-3 mt-20"> {/* Added mt-24 for margin top */}
      <h2 className="text-3xl font-bold mb-6">Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-start">
        {/* Profile Picture Section */}
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <img
            src={previewPic || 'path/to/default/profile-pic.png'} // Path to your default image
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white px-2 py-1 rounded-full cursor-pointer hover:bg-blue-700">
            Edit
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
        </div>

        {/* User Details Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold">First Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-600"
                />
              ) : (
                <span className="block mt-1">{user.firstName}</span>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold">Last Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-600"
                />
              ) : (
                <span className="block mt-1">{user.lastName}</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-lg font-semibold">Date of Birth:</label>
            {isEditing ? (
              <div className="flex items-center">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-1 block w-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-600"
                />
              </div>
            ) : (
              <span className="block mt-1">{user.dob}</span>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-lg font-semibold">Gender:</label>
            {isEditing ? (
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-f100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className="block mt-1">{user.gender}</span>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-lg font-semibold">Email:</label>
            <span className="block mt-1">{user.email}</span>
          </div>

          <div className="flex space-x-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
