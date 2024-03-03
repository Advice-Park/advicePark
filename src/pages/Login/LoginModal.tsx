import { useEffect, useRef } from "react";

type Props = {
  setModalOpen: (isOpen: boolean) => void;
};

const LoginModal = ({ setModalOpen }: Props) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: MouseEvent) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
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
    const RedirectUri = "https://advice-park.vercel.app/home";
    const LoginUrl = `https://mooooonmin.site/oauth2/authorization/google?redirect_uri=${RedirectUri}&mode=login`;
    window.location.href = LoginUrl;
  };

  return (
    <div
      ref={modalRef}
      className="w-full h-screen fixed top-0 left-0 bg-neutral-700 bg-opacity-50"
    >
      
      <div className="w-360 h-330 z-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-10 shadow-2 shadow-transparent-black">
      <button className="p-5" onClick={closeModal}>X</button>
        <button
          className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
          onClick={handleLogin}
        >
          구글로 계속하기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
