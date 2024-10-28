import React, { useEffect, useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { doPayment, bookRoom, clearAllUserErrors } from "../store/slices/bookingSlice";
import { useNavigate, useLocation } from "react-router-dom";
import  PaymentConfirmation  from "../components/PaymentConfirmation"


const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const location = useLocation();
  const { selectedRoom, selectedDates, addons, totalPrice } = location.state || {}; 

  const [cardholderName, setCardholderName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); // New state for success
  const [email, setEmail] = useState('');
  const { clientSecret, error, loading } = useSelector((state) => state.booking);
  
  const Imgpath = selectedRoom === "Normal" ? 'src/assets/rooms/normal.jpeg' : 'src/assets/rooms/deluxe.jpeg';
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update state when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }

    dispatch(doPayment({totalPrice}));
  };

  const processPayment = async () => {
    try {
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: cardholderName,
          },
        },
      });
      if (error) {
        toast.error(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentSuccess(true); // Show confirmation component
        toast.success("Payment Successful");
        
        const paymentIntentId = paymentIntent.id;

        const data = {
          dates: selectedDates,
          roomType: selectedRoom,
          addOns: addons,
          paymentIntentId,
          totalPrice,
          email
        }
        dispatch(bookRoom(data));
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error during payment: ${err.message}`);
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (clientSecret) {
      processPayment();
    }
  }, [dispatch, clientSecret, paymentSuccess, error, loading]);

  const handleComplete = () => {
    navigateTo("/"); // Navigate to root page after confirmation
  };

  return paymentSuccess ? (
    <PaymentConfirmation onComplete={handleComplete} />
  ) : (
    <div className="flex h-screen w-full mt-20 bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Left Side Card */}
      <div className="w-1/2 flex flex-col items-center bg-white shadow-lg rounded-r-2xl p-10">
        <h2 className="text-3xl mt-10 font-bold text-gray-900">Enjoy Your Stay ...</h2>
        <h3 className="text-6xl font-semibold text-indigo-500 mb-6">${totalPrice}</h3>
        {/* Product Image */}
        <div className=" w-3/4 mb-8">
          <img src={Imgpath} alt="Room" className="w-full h-auto rounded-lg object-cover shadow-md" />
        </div>
      </div>

      {/* Right Side Payment Form */}
      <div className="w-1/2 p-12 bg-white shadow-lg rounded-l-2xl">
        <h2 className="mt-10 text-4xl font-semibold text-gray-800 mb-6">Secure Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cardholder Name Field */}
          <div>
            <label htmlFor="cardholderName" className="block text-gray-700 font-medium mb-2">Cardholder's Name</label>
            <input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Card Number Field */}
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">Card Number</label>
            <CardNumberElement
              id="cardNumber"
              options={{
                style: {
                  base: {
                    color: "#32325d",
                    fontSize: "16px",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                  complete: {
                    color: "#4CAF50",
                    iconColor: "#4CAF50",
                  },
                },
              }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Expiration Date and CVV Fields */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="cardExpiry" className="block text-gray-700 font-medium mb-2">Expiration Date</label>
              <CardExpiryElement
                id="cardExpiry"
                options={{
                  style: {
                    base: {
                      color: "#32325d",
                      fontSize: "16px",
                      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                      fontSmoothing: "antialiased",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#fa755a",
                      iconColor: "#fa755a",
                    },
                    complete: {
                      color: "#4CAF50",
                      iconColor: "#4CAF50",
                    },
                  },
                }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="cardCvc" className="block text-gray-700 font-medium mb-2">CVC</label>
              <CardCvcElement
                id="cardCvc"
                options={{
                  style: {
                    base: {
                      color: "#32325d",
                      fontSize: "16px",
                      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                      fontSmoothing: "antialiased",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#fa755a",
                      iconColor: "#fa755a",
                    },
                    complete: {
                      color: "#4CAF50",
                      iconColor: "#4CAF50",
                    },
                  },
                }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              onChange={handleEmailChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading }
            className={`w-full py-4 rounded-lg shadow-md font-semibold text-white transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            }`}
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
