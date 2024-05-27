import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/instance";
import {
  Posts,
  deleteFavoritePost,
  favoritePost,
  getIsFavorite,
} from "../../services/api/posts";
import CommentList from "../../components/comment/CommentList";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";
import DelIcon from "../../assets/icons/trash.svg?react";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import { getUserInfoWithId } from "../../services/api/user";
import FormattingTime from "../../components/format/FormattingTime";
import Vote from "../../components/vote/Vote";

const DetailPost: React.FC = () => {
  const { postId } = useParams();
  const navi = useNavigate();

  // 로그인 확인
  const auth = useRecoilValue(authState);
  const isLogin = auth.isLoggedIn ? true : false;

  const [detailPost, setDetailPost] = useState<Posts>();

  // 좋아요 관리 state
  const [favoriteCount, setFavoriteCount] = useState<number>();
  const [favorite, setFavorite] = useState<boolean>();

  // 게시글 상세 정보 불러오기
  useEffect(() => {
    const getDetailPost = async () => {
      try {
        const { data } = await instance.get(`/api/post/${postId}`);
        setDetailPost(data.result);
        setFavoriteCount(data.result.favoriteCount);
        // 게시글 정보를 가져온 후 작성자 정보를 가져오도록 변경
        if (data.result.userId) {
          getUserInfoWithId(data.result.userId).then((userData) => {
            setDetailPost({
              ...data.result,
              name: userData.name,
              image: userData.image,
            });
          });
        }
      } catch (err) {
        alert("글 상세 정보를 불러올 수 없습니다.");
      }
    };

    getDetailPost();

    const getFavoriteData = async () => {
      const isFavorite = await getIsFavorite(parseInt(postId || ""));
      setFavorite(isFavorite);
    };

    if (isLogin) {
      getFavoriteData();
    }
  }, []);

  const favoriteHandler = async () => {
    if (isLogin) {
      if (!favorite) {
        setFavoriteCount(favoriteCount! + 1);
        favoritePost(parseInt(postId || ""));
      } else {
        setFavoriteCount(favoriteCount! - 1);
        deleteFavoritePost(parseInt(postId || ""));
      }
      setFavorite(!favorite);
    } else {
      alert("로그인 후 이용해주세요");
    }
  };

  const deletePost = async () => {
    try {
      await instance.delete(`/api/post/${postId}`);
      navi("/posts");
    } catch (e) {
      alert("글 삭제 에러");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col p-8 gap-5 bg-white">
        <div className="flex items-center gap-3">
          {/* 작성자 정보 */}
          <img src={detailPost?.image} className="w-10 h-10 rounded-full" />
          <div className="text-xs text-gray-600">
            <p className="text-sm font-bold">{detailPost?.name}</p>
            <FormattingTime createdTime={detailPost?.createdTime || ""} />
          </div>
        </div>

        {/* 제목 */}
        <div className="w-full flex justify-between text-2xl font-bold pb-5 border-b">
          {detailPost?.title}
          {/* 작성자에게만 삭제버튼 노출 */}
          {auth.userId === detailPost?.userId && (
            <button
              className="p-1 rounded-lg text-black bg-white hover:bg-gray-300"
              // onClick={handleLogin}
              onClick={deletePost}
            >
              <DelIcon />
            </button>
          )}
        </div>
        {/* 내용 */}
        <div>{detailPost?.contents}</div>

        {/* 첨부된 이미지 */}
        <ul className="flex gap-3">
          {detailPost?.imageUrls.map((post, idx) => (
            <li
              key={idx}
              className="flex items-center w-20 h-20 rounded-md border overflow-hidden"
            >
              <img src={post} alt={detailPost?.title} />
            </li>
          ))}
        </ul>

        {/* 찬반 투표 창 */}
        <div>{detailPost?.postVoteOption === "YES_NO" && <Vote />}</div>

        <ul className="flex gap-3 flex-row-reverse">
          {/* 글 즐겨찾기 */}
          <li onClick={favoriteHandler} className="flex">
            {favorite ? "❤️" : <LikeIcon />}
            {favoriteCount}
          </li>

          {/* 댓글수 */}
          <li className="flex">
            <CommentIcon /> {detailPost?.commentCount}
          </li>

          {/* 조회수 */}
          <li className="flex">
            <VeiwIcon /> {detailPost?.viewCount}
          </li>
        </ul>
      </div>
      <div>
        <CommentList postId={parseInt(postId || "0")} />
      </div>
    </>
  );
};

export default DetailPost;
