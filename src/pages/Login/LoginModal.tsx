import { useEffect, useRef } from "react";

type AuthProps = {
  setModalOpen: (isOpen: boolean) => void;
  // setAuth: (auth: { isLoggedIn: boolean }) => void;
};

const LoginModal = ({ setModalOpen }: AuthProps) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 외부 클릭 시 닫기
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: MouseEvent) => {
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
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, [setModalOpen]);

  const handleLogin = () => {
    const RedirectUri = "https://advice-park.vercel.app";
    const LoginUrl = `https://mooooonmin.site/oauth2/authorization/google?redirect_uri=${RedirectUri}&mode=login`;
    window.location.href = LoginUrl;
  };

  useEffect(() => {
    // URL에서 토큰을 추출하여 인증 상태 확인
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get("access_token");
    if (access_token) {
      // setAuth({ isLoggedIn: true });
      setModalOpen(false);
    }
  }, [setModalOpen]);

  return (
    <div
      ref={modalRef}
      className="w-full h-screen fixed top-0 left-0 bg-neutral-700 bg-opacity-50"
    >
      <div className="z-100 p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lime-400 rounded-10 shadow-2 shadow-transparent-black">
        <button className="p-10 m-100" onClick={closeModal}>
          X
        </button>
        <button
          className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
          onClick={handleLogin}
        >
          {/* <div
            className="w-10 h-10"
            style={{
              backgroundImage: `url('../../assets/icons/google-icon.png')`,
            }}
          ></div>
          <img src="../../assets/icons/google-icon.png" /> */}
          구글로 계속하기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
