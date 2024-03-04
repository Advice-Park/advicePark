import React, { useEffect, useState } from "react";
import HotPost from "./HotPost";
import Login from "../Login/LoginModal";
import { useCookies } from "react-cookie";
import { authState } from "../../contexts/state";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Home: React.FC = () => {
  //recoil 사용 선언
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

  // 로그인 모달
  const [modalOpen, setModalOpen] = useState(false);

  const [cookies, setCookie] = useCookies(["token"]);

  // 모달창 열기
  const showModal = () => {
    setModalOpen(true);
  };

  const params = new URLSearchParams(window.location.search);
  if (params.get("access_token")) {
    useEffect(() => {
      const access_token = params.get("access_token");
      setCookie("token", access_token);
      console.log(cookies.token);

      setAuth({ isLoggedIn: true });
    }, [cookies, setCookie]);
  }

  // 로그아웃
  const handleLogout = () => {
    setAuth({ isLoggedIn: false });
  }

  return (
    <div className="w-full flex justify-center h-screen mx-auto bg-slate-400">
      {/* ---큰화면용 이미지--- */}
      <div className="md:flex hidden flex-col justify-center h-screen">
        왼쪽 이미지
      </div>

      {/* ---웹앱 창--- */}
      <div className="max-w-390 h-screen overflow-y-scroll bg-yellow-400 mx-5">
        오른쪽 상자
        <div className="sticky top-0 left-0 w-full z-50 flex flex-row justify-between items-center p-2 px-4 bg-blue-400">
          <div>박훈수 훈수두기 서비스 </div>
          {modalOpen && <Login setModalOpen={setModalOpen} />}
          {auth.isLoggedIn ? <button
            className="py-2 px-4 rounded-lg shadow-md text-black bg-green-300 hover:bg-lime-300"
            // onClick={handleLogin}
            onClick={handleLogout}
          >
            로그아웃
          </button> : <button
            className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
            // onClick={handleLogin}
            onClick={showModal}
          >
            로그인
          </button>}
          
        </div>
        <HotPost />
      </div>
    </div>
  );
};

export default Home;
