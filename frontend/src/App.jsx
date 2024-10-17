import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Booking from "./pages/Booking";
import Login from './pages/login'
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile"
import MyAllBookings from "./pages/MyAllBookings";
import CurrentBooking from "./pages/CurrentBooking";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booking" element={<Booking />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile/>} />
            <Route path="currentbooking" element={<CurrentBooking />} />
            <Route path="myallbooking" element={<MyAllBookings/>} />
            {/* <Route path="changepassword" element={<ChangePassword/>} /> */}
            {/* Redirect to profile by default */}
            <Route path="" element={<Profile />} />
          </Route>

          {/* Catch-All Route for 404 */}
          {/* <Routes path="*" element={<NotFound />} /> */}


          <Route path="/forgotPassword" element={<ForgotPassword/>} />
 
        </Routes>
        {/* <Footer /> */}
        <ToastContainer position="top-center" theme="dark" />
      </Router>
    </div>
  );
};


export default App
