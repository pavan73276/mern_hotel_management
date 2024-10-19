import React, { useState } from 'react'
import { ToastContainer} from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLogin from "./pages/DashboardLogin";

import Login from "./pages/Login";
import Sidebar from './pages/Sidebar';
import AdminForm from './pages/AddNewAdmin';
import RoomForm from './pages/AddRoom';

import './App.css';

function App() {

  return (

    <>
    
    <Router>
        <Routes>
          <Route path="/" element={<Login/>} />

          <Route
            path="/sidebar/*"
            element={
             
                <Sidebar />
             
            }
          >

            <Route path="addnewadmin" element={<AdminForm/>} />
            <Route path="addnewstaff" element={<AdminForm/>} />
            <Route path="addroom" element={<AdminForm/>} />
            <Route path="deleteroom" element={<AdminForm/>} />
            <Route path="getallrooms" element={<AdminForm/>} />
            <Route path="getallbookings" element={<AdminForm/>} />

          </Route>

        </Routes>
        <ToastContainer position="top-center" theme="dark" />
      </Router>

    </>
    

   
  )
}

export default App;
