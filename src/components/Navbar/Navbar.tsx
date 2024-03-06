import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authState } from "../../contexts/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginModal from "../../pages/Login/LoginModal";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  //recoil 사용 선언
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

  // 로그인 모달
  const [modalOpen, setModalOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // 모달창 열기
  const showModal = () => {
    setModalOpen(true);
  };

  // 토큰 추출
  const params = new URLSearchParams(window.location.search);
  const access_token = params.get("access_token");
  if (access_token) {
    useEffect(() => {
      setCookie("token", access_token);
      console.log(cookies.token);

      setAuth({ isLoggedIn: true });
    }, []);
  }

  // 로그아웃
  const handleLogout = () => {
    setAuth({ isLoggedIn: false });
    removeCookie("token", { path: "/" });
  };

  return (
    <header>
      <div className="sticky top-0 left-0 w-full z-50 flex flex-row justify-between items-center py-2 px-4 bg-blue-400">
        <div>박훈수 훈수두기 서비스 </div>
        {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
        {auth.isLoggedIn ? (
          <>
            <ul className="flex gap-4">
              <li onClick={() => navigate("/post")}>글쓰기</li>
              <li onClick={() => navigate("/posts")}>글목록</li>
              <li onClick={() => navigate("/my")}>마이페이지</li>
            </ul>
            <button
              className="py-2 px-4 rounded-lg shadow-md text-black bg-green-300 hover:bg-lime-300"
              // onClick={handleLogin}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <button
            className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
            // onClick={handleLogin}
            onClick={showModal}
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
