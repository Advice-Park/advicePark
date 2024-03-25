import React from "react";
import HotPost from "../../components/Home/HotPost";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import LatestPost from "../../components/Home/LatestPost";

const Home: React.FC = () => {
  //recoil 사용 선언
  const auth = useRecoilValue(authState);

  return (
    <div>
      <div className="w-full p-5 bg-blue-400 rounded-br-full">
        {auth.isLoggedIn
          ? `userId: ${auth.name} 님 안녕하세요`
          : "로그인하고 훈수를 받아보세요!"}
      </div>
      <div className="w-full mt-5">
        <LatestPost />
        <HotPost />
      </div>
    </div>
  );
};

export default Home;
