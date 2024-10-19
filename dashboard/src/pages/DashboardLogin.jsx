import React from 'react';

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 w-1/2 bg-teal-900 flex justify-center items-center">
        <div className="text-center text-white">
          <img src="/logo.png" alt="Bailey and Co." className="w-24 mx-auto mb-4" />
          <h1 className="text-6xl font-semibold">Bailey and Co.</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center bg-teal-800">
        <div className=" p-8  w-180">
          <h2 className="text-4xl font-bold mb-4 text-center">Welcome</h2>
          <p className="text-white-800 mb-5 text-center">Please login to Admin Dashboard</p>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />
          <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition">
            Login
          </button>
          <p className="text-black-600 mt-4 text-center cursor-pointer hover:underline">
            Forgotn Your Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
