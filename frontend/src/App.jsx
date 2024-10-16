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

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          {/* <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/application/:jobId" element={<PostApplication />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
        {/* <Footer /> */}
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </div>
  );
};


export default App
