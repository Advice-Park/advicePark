import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
      <Routes>
        {/* <Route path="/" exact={true} element={<Home />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
