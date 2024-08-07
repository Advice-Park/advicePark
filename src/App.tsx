import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-between h-screen mx-auto bg-slate-400">
        {/* ---큰화면용 이미지--- */}
        <div className="md:flex hidden flex-col justify-end h-screen">
          <img className="w-1/2" src="/img/green-dinosaur.png" alt="mainImg" />
          <img src="/img/beach.png" alt="beach" />
        </div>

        {/* ---웹앱 창--- */}
        <div
          className="max-w-md w-full h-screen overflow-y-scroll bg-gray-100 border border-gray-200"
          suppressHydrationWarning={true}
        >
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
