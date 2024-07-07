import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";

const PrivateRoute: React.FC = () => {
  const auth = useRecoilValue(authState);

  //  현재 URL 확인
  const location = useLocation();

  if (!auth.isLoggedIn) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/" state={{ from: location }} />; // from에 현재 URL을 저장하여 리다렉트에 사용
  }

  return <Outlet />; //로그인 상태라면 원래 컴포넌트로 렌더링
};

export default PrivateRoute;
