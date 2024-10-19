import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../store/slices/userSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();

  const { loading} = useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email));
    setEmailSent(true);
  };

  useEffect(()=>{
    setEmailSent(false);
  },[])

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      {loading ? (
        <div className="spinner text-center">Loading...</div>
      ) : (
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>
          <p className="text-gray-600 text-lg text-center mb-8">
            {!emailSent
              ? "Enter your email address below, and we'll send you a link to reset your password."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailSent && (
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Email Address <sup className="text-red-500">*</sup>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          {/* Back to login link */}
          <div className="mt-6 flex justify-between items-center text-gray-600">
            <Link to="/login" className="flex items-center text-yellow-500 hover:underline">
              <BiArrowBack className="mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
