import React from "react";
// import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  // const navigate = useNavigate();

  const handleLogin = () => {
    const RedirectUri =
      "https://advice-park.vercel.app/home";
    const LoginUrl = `https://mooooonmin.site/oauth2/authorization/google?redirect_uri=${RedirectUri}&mode=login`;

    window.location.href = LoginUrl;
  };

  return (
    <>
      <button
        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
        onClick={handleLogin}
      >
        구글 로그인
      </button>

      <a
        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700"
        href="/home"
      >
        비회원(홈 작업 중)
      </a>
    </>
  );
};

export default Login;
