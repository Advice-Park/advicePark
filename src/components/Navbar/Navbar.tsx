import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authState } from "../../contexts/state";
import LoginModal from "../../pages/Login/LoginModal";
import SearchIcon from "../../assets/icons/search.svg?react";
import MyPageIcon from "../../assets/icons/myPage.svg?react";
import WriteIcon from "../../assets/icons/write.svg?react";
import BoardIcon from "../../assets/icons/postsBoard.svg?react";
import { getUserInfo } from "../../services/api/user";
import { useRecoilState } from "recoil";

const Navbar: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authState);

  // 로그인 모달
  const [modalOpen, setModalOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const showModal = () => {
    setModalOpen(true);
  };

  // 토큰 추출
  const params = new URLSearchParams(window.location.search);
  const access_token = params.get("access_token");

  useEffect(() => {
    console.log("로그인 상태 auth.isLoggedIn", auth.isLoggedIn);

    // 이미 로그인되어 있는지 확인
    // if (cookies.token) {
    //   // 유저 정보 저장
    //   getUserInfo()
    //     .then((res) => {
    //       if (res) {
    //         setAuth({
    //           isLoggedIn: true,
    //           userId: res.userId,
    //           name: res.name,
    //           image: res.image,
    //         });
    //       } else {
    //         console.log("nav 확인 유저정보를 가져오지 못했습니다.");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("nav 확인 호출 중 에러 발생:", err);
    //     });
    //   return;
    // }

    // 로그인 성공 시에만 새로고침
    if (access_token) {
      setCookie("token", access_token, { path: "/" });
      console.log(cookies.token);

      if (cookies.token) {
        console.log("토큰이 있습니다. 유저 정보를 가져옵니다.");
        getUserInfo()
          .then((res) => {
            if (res) {
              setAuth({
                isLoggedIn: true,
                userId: res.userId,
                name: res.name,
                image: res.image,
              });
              console.log("유저 정보", res);
            } else {
              console.log("유저 정보를 가져오지 못했습니다.");
            }
          })
          .catch((err) => {
            console.log("에러 발생:", err);
          });
      } else {
        console.log("토큰이 없습니다.");
      }

      // window.location.reload();

      return;
    }
  }, []);

  useEffect(() => {
    console.log("nav 확인 유저정보", auth);
  }, [auth]);

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, userId: 0, name: "비회원", image: "" });
    removeCookie("token", { path: "/" });
    location.href = "/";
  };

  const navHandler = (menu: string) => {
    location.href = `/${menu}`;
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
                className="btn bg-light-blue hover:bg-white"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className="btn bg-white hover:text-light-blue"
              onClick={showModal}
            >
              로그인
            </button>
          )}
          {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
