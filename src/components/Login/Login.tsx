import React from "react";

const Login: React.FC = () => {
  const redirectUri =
    "http://advice-p-front.s3-website.ap-northeast-2.amazonaws.com/";
  const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID
  }&redirect_uri=${redirectUri}&response_type=code&scope=email+profile`;

  const handleLogin = () => {
    window.location.href = loginUrl;
  };
  return (
    <>
      <button
        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
        onClick={handleLogin}
      >
        소셜 로그인 가기
      </button>
      <a
        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700"
        href="/home"
      >
        홈
      </a>
      ;
    </>
  );
};

export default Login;
