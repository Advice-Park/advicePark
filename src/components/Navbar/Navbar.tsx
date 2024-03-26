import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authState } from "../../contexts/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginModal from "../../pages/Login/LoginModal";
import SearchIcon from "../../assets/icons/search.svg?react";
import MyPageIcon from "../../assets/icons/myPage.svg?react";
import WriteIcon from "../../assets/icons/write.svg?react";
import BoardIcon from "../../assets/icons/postsBoard.svg?react";
import { getUserInfo } from "../../services/api/user";

const Navbar: React.FC = () => {
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

  useEffect(() => {
    // 이미 로그인되어 있는지 확인
    if (cookies.token) {

      // 유저 정보 저장
      getUserInfo().then((res) => {
        setAuth({
          isLoggedIn: true,
          userId: res.userId,
          name: res.name,
          image: res.image,
        });
      })
      return;
    }

    // 로그인 성공 시에만 새로고침
    if (access_token) {
      setCookie("token", access_token);
      console.log(cookies.token);

      // 유저 정보 저장
      getUserInfo().then((res) => {
        setAuth({
          isLoggedIn: true,
          userId: res.userId,
          name: res.name,
          image: res.image,
        });
      })

      // 새로고침
      window.location.reload();

      return;
    }
  }, []);

  // 로그아웃
  const handleLogout = () => {
    setAuth({ isLoggedIn: false, userId: 0, name: "비회원", image: "" });
    removeCookie("token", { path: "/" });
    location.href = "https://advice-park.vercel.app/";
  };

  // 로그인 상태 변화 시 새로고침
  useEffect(() => {
    // window.location.reload();
  }, [setAuth]);

  const navHandler = (menu: string) => {
    location.href = `https://advice-park.vercel.app/${menu}`;
  };

  return (
    <header>
      <div className="sticky top-0 left-0 w-full z-50 flex flex-row justify-between items-center py-2 px-4 bg-dark-blue">
        <h1 onClick={() => navHandler("")}>박훈수</h1>
        <nav className="flex items-center gap-3">
          {auth.isLoggedIn ? (
            <>
              <ul
                className="flex gap-3 flex-nowrap"
                suppressHydrationWarning={true}
              >
                <li onClick={() => navHandler("search")}>
                  <SearchIcon />
                </li>
                <li onClick={() => navHandler("post")}>
                  <WriteIcon />
                </li>
                <li onClick={() => navHandler("posts")}>
                  <BoardIcon />
                </li>
                <li onClick={() => navHandler("my")}>
                  <MyPageIcon />
                </li>
              </ul>
              <button
                className="py-2 px-4 rounded-lg shadow-md text-black bg-green-300 hover:bg-lime-300"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
              onClick={showModal}
            >
              로그인
            </button>
          )}
          {modalOpen && (
            <LoginModal setModalOpen={setModalOpen} setAuth={setAuth} />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
