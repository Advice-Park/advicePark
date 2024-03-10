import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-center h-screen mx-auto bg-slate-400">
        {/* ---큰화면용 이미지--- */}
        <div className="md:flex hidden flex-col justify-center h-screen">
          왼쪽 이미지
        </div>

        {/* ---웹앱 창--- */}
        <div
          className="max-w-390 h-screen overflow-y-scroll bg-yellow-400 mx-5"
          suppressHydrationWarning={true}
        >
          오른쪽 상자 여기에 실제 웹앱 내용이 들어가는 중 최대 넓이 테스트 중
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
