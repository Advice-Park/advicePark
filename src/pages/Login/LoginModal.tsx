import { useEffect, useRef } from "react";
import googleIcon from "/iconImgs/google-icon.png";
import { getUserInfo } from "../../services/api/user";

type AuthProps = {
  setModalOpen: (isOpen: boolean) => void;
  setAuth: (auth: {
    isLoggedIn?: boolean;
    userId?: number;
    name?: string;
    image?: string;
  }) => void;
};

const LoginModal = ({ setModalOpen, setAuth }: AuthProps) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 외부 클릭 시 닫기
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: MouseEvent | TouchEvent) => {
      // mousedown 이벤트 발생 영역이 모달창이 아닐 때, 모달창 닫기
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler); // 모바일 대응
    };
  }, [setAuth, setModalOpen]);

  const handleLogin = () => {
    const RedirectUri = "https://advice-park.vercel.app";
    const LoginUrl = `https://mooooonmin.site/oauth2/authorization/google?redirect_uri=${RedirectUri}&mode=login`;
    window.location.href = LoginUrl;
  };

  useEffect(() => {
    // URL에서 토큰을 추출하여 인증 상태 확인
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get("access_token");
    console.log("로그인 모달", access_token);
    if (access_token) {
      // 유저 정보 저장
      getUserInfo().then((res) => {
        if (res) {
          setAuth({
            isLoggedIn: true,
            userId: res.userId,
            name: res.name,
            image: res.image,
          });
        }
        console.log("유저정보", res);
      });
      // 쿠키 설정
      document.cookie = `token=${access_token}; path=/`;
      setModalOpen(false);
    }
  }, [setAuth, setModalOpen]);

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-neutral-700 bg-opacity-70">
      <div
        ref={modalRef}
        className="flex flex-col items-center z-100 w-72 h-60 p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-blue rounded-lg shadow-2 shadow-transparent-black text-white"
      >
        <h2 className="text-2xl">박훈수</h2>
        <button
          className="flex justify-center items-center py-2 pl-2 px-4 mt-16 rounded-lg shadow-md text-black bg-white hover:bg-light-blue hover:text-white"
          onClick={handleLogin}
        >
          <img src={googleIcon} className="w-8 h-8" />
          <span>구글로 계속하기</span>
        </button>
        <button className="absolute top-3 right-5" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
