import React from "react";
import HotPost from "../../components/Home/HotPost";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import LatestPost from "../../components/Home/LatestPost";
import Gallery from "../../components/Home/Gallery";

const Home: React.FC = () => {
  //recoil 사용 선언
  const auth = useRecoilValue(authState);

  return (
    <div>
      <div className="w-full p-5 bg-dark-blue text-white rounded-br-full">
        {auth.isLoggedIn
          ? `${auth.name} 님 안녕하세요`
          : "로그인하고 훈수를 받아보세요!"}
      </div>
      <div className="w-full mt-5">
        <h2 className="h2-primary">최신 질문글</h2>
        <LatestPost />

        <h2 className="h2-primary mt-5">HOT 질문글</h2>
        <HotPost />

        <h2 className="h2-primary mt-5">갤러리</h2>
        <Gallery />
      </div>
    </div>
  );
};

export default Home;
