// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
