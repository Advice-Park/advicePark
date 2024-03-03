import React from "react";

const Home: React.FC = () => {

  const handleLogin = () => {
    const RedirectUri = "https://advice-park.vercel.app/home";
    const LoginUrl = `https://mooooonmin.site/oauth2/authorization/google?redirect_uri=${RedirectUri}&mode=login`;

    window.location.href = LoginUrl;
  };

  return (
    <div className="w-full flex justify-center h-screen mx-auto bg-slate-400">
      <div className="md:flex hidden flex-col justify-center h-screen">
        왼쪽 이미지
      </div>
      <div className="max-w-390 h-screen overflow-y-scroll bg-yellow-400 mx-5">
        오른쪽 상자
        <div className="sticky top-0 left-0 w-full z-50 flex flex-row justify-between items-center p-2 px-4 bg-blue-400">
          nav 바
          <button
            className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
            onClick={handleLogin}
          >
            구글 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
