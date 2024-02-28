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

  const handleLogin = () => {
    window.location.href = "/api/oauth2/google";
  }
    return <button
    className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
  >
    로그인
  </button>;
  
};

export default Login;
