import { useEffect, useState } from "react";
import {
  deleteOppose,
  deleteSupport,
  getVote,
  postOppose,
  postSupport,
} from "../../services/api/vote";
// import { useRecoilValue } from "recoil";
// import { authState } from "../../contexts/state";

type VoteProps = {
  postId: number;
};

const Vote = ({ postId }: VoteProps) => {
  // const auth = useRecoilValue(authState);

  const [proCount, setProCount] = useState<number>(0);
  const [conCount, setConCount] = useState<number>(0);

  const proPer: number = Math.round((proCount / (proCount + conCount)) * 100);
  const conPer: number = 100 - proPer;

  const proCountWidth: number = isNaN(proPer) ? 50 : proPer;
  const conCountWidth: number = isNaN(conPer) ? 50 : conPer;

  const [proInputValue, setProInputValue] = useState<boolean>(false);
  const [conInputValue, setConInputValue] = useState<boolean>(false);

  useEffect(() => {
    getVote(postId).then((res) => {
      if (res === "SUPPORT") {
        setProInputValue(true);
      } else {
        setConInputValue(true);
      }
    });
  }, []);

  const voteProHandler = () => {
    console.log("Pro", proInputValue, proCount, proCountWidth);
    // if (auth.isLoggedIn) {
    if (conInputValue === true && proInputValue === false) {
      return alert("찬성/반대는 동시에 선택될 수 없습니다.");
    }

    if (conInputValue === false && proInputValue === false) {
      postSupport(postId);
      setProInputValue(true);
      setProCount(proCount + 1);
    }

    if (conInputValue === false && proInputValue === true) {
      deleteSupport(postId);
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
      postOppose(postId);
      setConInputValue(true);
      setConCount(conCount + 1);
    }

    if (proInputValue === false && conInputValue === true) {
      deleteOppose(postId);
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
      <p className="flex justify-between">
        {/* 찬성 버튼 */}
        <span
          onClick={voteProHandler}
          className={
            proInputValue ? "text-green-700 font-bold" : "text-gray-500"
          }
        >
          찬성 {proCountWidth}
        </span>

        {/* 반대 버튼 */}
        <span
          onClick={voteConHandler}
          className={conInputValue ? "text-red-700 font-bold" : "text-gray-500"}
        >
          {conCountWidth} 반대
        </span>
      </p>

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
            <span className="text-white">
              {proCountWidth > 50 ? "WIN" : ""}
            </span>
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
            <span className="text-white">
              {conCountWidth > 50 ? "WIN" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
