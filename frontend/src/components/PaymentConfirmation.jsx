import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmation = ({ onComplete }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    const navigateTimer = setTimeout(() => {
      onComplete(); // Trigger navigation back to root after a few seconds
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigateTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {showLoading ? (
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700">Processing...</p>
          <div className="loader mt-6 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <div className="text-center">
          <svg
            className="w-24 h-24 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4"
            />
          </svg>
          <p className="mt-4 text-2xl font-bold text-green-600">Booking Successful!</p>
          <p className="text-md mt-2 text-gray-500">Booking receipt sent to your email.</p>
          <button
            className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={onComplete}
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
