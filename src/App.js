import React from 'react';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/LoginSignup/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
