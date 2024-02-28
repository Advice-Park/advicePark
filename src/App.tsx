// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import Home from './components/Home/Home';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
