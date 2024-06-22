import React, { useState } from "react";
// import { useRecoilValue } from "recoil";
// import { authState } from "../../contexts/state";

const Vote: React.FC = () => {
  // const auth = useRecoilValue(authState);

  const [proCount, setProCount] = useState<number>(0);
  const [conCount, setConCount] = useState<number>(0);

  const proPer: number = Math.round((proCount / (proCount + conCount)) * 100);
  const conPer: number = 100 - proPer;

  const proCountWidth: number = isNaN(proPer) ? 50 : proPer;
  const conCountWidth: number = isNaN(conPer) ? 50 : conPer;

  const [proInputValue, setProInputValue] = useState<boolean>(false);
  const [conInputValue, setConInputValue] = useState<boolean>(false);

  const voteProHandler = () => {
    console.log("Pro", proInputValue, proCount, proCountWidth);
    // if (auth.isLoggedIn) {
    if (conInputValue === true && proInputValue === false) {
      return alert("찬성/반대는 동시에 선택될 수 없습니다.");
    }

    if (conInputValue === false && proInputValue === false) {
      setProInputValue(true);
      setProCount(proCount + 1);
    }

    if (conInputValue === false && proInputValue === true) {
      setProInputValue(false);
      setProCount(proCount - 1);
    }
    // } else {
    //   alert("로그인 후 이용해 주세요");
    // }
  };

  const voteConHandler = () => {
    console.log("Con", conInputValue, conCount, conCountWidth);
    // if (auth.isLoggedIn) {
    if (proInputValue === true && conInputValue === false) {
      return alert("찬성/반대는 동시에 선택될 수 없습니다.");
    }

    if (proInputValue === false && conInputValue === false) {
      setConInputValue(true);
      setConCount(conCount + 1);
    }

    if (proInputValue === false && conInputValue === true) {
      setConInputValue(false);
      setConCount(conCount - 1);
    }
    // } else {
    //   alert("로그인 후 이용해 주세요");
    // }
  };

  // 찬반 투표 진행상황에 따른 사이즈
  const bigVote: number = 20;
  const smallVote: number = 10;

  return (
    <div className="w-full pt-2">
      <div className="w-full p-1 border rounded-lg flex justify-between">
        {/* 찬성 */}
        <div>
          <div
            className={
              proCountWidth > 50
                ? `w-${bigVote} h-${bigVote} bg-green-700`
                : `w-${smallVote} h-${smallVote} bg-green-700`
            }
          >
            {proCountWidth > 50 ? "WIN" : ""}
          </div>
        </div>

        {/* 반대 */}
        <div>
          <div
            className={
              conCountWidth > 50
                ? ` w-${bigVote} h-${bigVote} bg-orange-700`
                : `w-${smallVote} h-${smallVote} bg-orange-700`
            }
          >
            {conCountWidth > 50 ? "WIN" : ""}
          </div>
        </div>
      </div>

      <p className="flex justify-between">
        <span onClick={voteProHandler}>
          <b className="text-green-700">찬성</b> {proCountWidth}
        </span>
        <span onClick={voteConHandler}>
          {conCountWidth} <b className="text-orange-700">반대</b>
        </span>
      </p>
    </div>
  );
};

export default Vote;
