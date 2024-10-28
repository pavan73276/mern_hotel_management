import React, {useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from './pages/Sidebar';
import AddNewForm from './pages/AddNew';
import RoomForm from './pages/AddRoom';
import GetAllRooms from './pages/GetAllRooms';
import AllBookings from './pages/GetAllBookings';
import AllStaffs from './pages/getAllStaffs';
import './App.css';
import ProtectedRoute from '../../frontend/src/components/ProtectedRoute';
import {getUser} from './store/slices/userSlice'
import { useDispatch } from 'react-redux';
import CurrentStays from './components/currentStays';
import CheckInOut from './components/checkInOut';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [])

  return (
    <>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
          
          {/* Protected Route for Staff */}
          <Route 
            path="/staff/*" 
            element={
              <ProtectedRoute role="staff">
                <Sidebar role="staff" />
              </ProtectedRoute>
            }
          >
            <Route path="currentStays" element={<CurrentStays />} />
            <Route path="CheckinCheckout" element={<CheckInOut />} />
            
          </Route>

          {/* Protected Route for Admin */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute role="admin">
                <Sidebar role="admin" />
              </ProtectedRoute>
            }
          >
            <Route path="addnew" element={<AddNewForm />} />
            <Route path="getallrooms" element={<GetAllRooms />} />
            <Route path="getallbookings" element={<AllBookings/>} />
            <Route path="addroom" element={<RoomForm />} />
            <Route path="getallstaffs" element={<AllStaffs />} />
            
          </Route>
        </Routes>
        <ToastContainer position="top-center" theme="dark" />
      </Router>
    </>
  );
}

export default App;
