import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLogin from "./pages/DashboardLogin";
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLogin />} />
      </Routes>
    </Router>
  )
}

export default App;
