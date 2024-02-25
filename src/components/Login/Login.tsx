import React, { useEffect } from "react";
import axios from "axios";

const Login: React.FC = () => {
    useEffect(() => {
      axios
        .get("http://43.203.215.148:8080/api/oauth2/google")
        .then((response) => {
          console.log("응답 데이터:", response.data);
          const url = response.data.url;
          console.log("URL:", url);

          if (url) {
            window.location.href = url;
          } else {
            console.error("서버로부터 받은 URL이 없습니다.");
          }
        })
        .catch((error) => {
          console.error("Google URL get 응답 오류:", error);
        });
    }, []);

  return <>로그인</>;
};

export default Login;
