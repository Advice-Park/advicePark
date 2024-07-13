import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5 text-dark-blue">
      <span className="text-3xl text-mid-blue">404 ERROR</span>
      <h3 className="text-4xl">페이지를 찾을 수 없습니다.</h3>
      <div>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </div>
      <button onClick={() => window.history.back()} className="btn hover:text-light-blue">이전 페이지</button>
    </div>
  );
};

export default NotFound;
