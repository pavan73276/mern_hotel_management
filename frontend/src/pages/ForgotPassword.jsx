import { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken, resetPassword } from "../store/slices/userSlice";
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const otpRefs = useRef([]);
  const timerRef = useRef(null); // To store the timer reference
  
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading, otpSent } = useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email));
    setEmailSent(true);
    resetTimer(); // Start the timer
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, value) => {
    if (value === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    const user_otp = Number(otp.join(''));

    if(user_otp != otpSent) {
      toast.error('Otp does not match !');
      return;
    }

    if(newPassword != confirmPassword) {
      toast.error('Passwords does not Match');
    }

    dispatch(resetPassword({email, newPassword}));
    
    navigateTo("/login");
  };

  const resetTimer = () => {
    setTimeLeft(300); // Reset to 5 minutes
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current); // Stop timer when it reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current); // Clean up on unmount
    };
  }, [dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

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

          {emailSent && (
            <>
              <hr className="my-6 border-gray-300" />

              {/* OTP Input Fields */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Enter OTP
                </label>
                <div className="flex space-x-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(index, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          handleBackspace(index, e.target.value);
                        }
                      }}
                      ref={(el) => (otpRefs.current[index] = el)}
                      className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              {/* New Password and Confirm Password */}
              <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    New Password
                  </label>
                  <input
                    required
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                  disabled={timeLeft === 0}
                >
                  Reset Password
                </button>
              </form>

              {/* OTP Expiry Timer */}
              <p className="text-gray-600 text-center mt-4">
                OTP is valid only for: <span className="font-bold">{formatTime(timeLeft)}</span>
              </p>
            </>
          )}

          {/* Back to login link */}
          <div className="mt-6 flex justify-between items-center text-gray-600">
            <Link
              to="/login"
              className="flex items-center text-yellow-500 hover:underline"
            >
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
