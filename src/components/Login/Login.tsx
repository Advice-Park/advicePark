import React, { useEffect } from "react";
// import instance from "../../services/instance";

const Login: React.FC = () => {
  useEffect(() => {
    // instance
    //   .get("/api/oauth2/google")
    //   .then((response) => {
    //     console.log("응답 데이터:", response.data);
    //     const url = response.data.url;
    //     console.log("URL:", url);
    //     if (url) {
    //       window.location.href = url;
    //     } else {
    //       console.error("서버로부터 받은 URL이 없습니다.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Google URL get 응답 오류:", error);
    //   });
  }, []);

  const redirectUri = "http://advice-p-front.s3-website.ap-northeast-2.amazonaws.com/"
  const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email+profile`

  const handleLogin = () => {
    window.location.href = loginUrl
  }
    return <button
    className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
    onAbort={handleLogin}
  >
    소셜 로그인 가기
  </button>;
  
};

export default Login;
