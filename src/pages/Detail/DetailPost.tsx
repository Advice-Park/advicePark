import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../services/instance";
import { Posts, favoritePost, getIsFavorite } from "../../services/api/posts";
import CommentList from "../../components/comment/CommentList";
import WriteComment from "../../components/comment/WriteComment";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";

const DetailPost: React.FC = () => {
  const { postId } = useParams();

  // 로그인 확인
  const auth = useRecoilValue(authState);
  const isLogin = auth.isLoggedIn ? true : false;

  const [detailPost, setDetailPost] = useState<Posts>();
  const [createdDate, setCreatedDate] = useState("");

  // 좋아요 관리 state
  const [favoriteCount, setFavoriteCount] = useState<number>();
  const [favorite, setFavorite] = useState<boolean>();

  // 게시글 상세 정보 불러오기
  useEffect(() => {
    const getDetailPost = async () => {
      try {
        const { data } = await instance.get(`/api/post/${postId}`);
        setDetailPost(data.result);

        const formattingTime = data.result.createdTime?.replace(
          /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/,
          "$1.$2.$3 $4:$5"
        );

        console.log(formattingTime);

        setFavoriteCount(data.result.favoriteCount);

        setCreatedDate(formattingTime);
      } catch (e) {}
    };

    getDetailPost();

    const getFavoriteData = async () => {
      const isFavorite = await getIsFavorite(parseInt(postId || ""));
      setFavorite(isFavorite);
    };

    getFavoriteData();
  }, []);

  const favoriteHandler = async () => {
    if (isLogin) {
      favoritePost(parseInt(postId || ""));
      setFavorite(!favorite);
    } else {
      alert("로그인 후 이용해주세요");
    }
  };

  const deletePost = async () => {
    try {
      await instance.delete(`/api/post/${postId}`);
    } catch (e) {
      alert("삭제 에러(작성자인지 확인)");
    }
  };

  return (
    <div className="flex flex-col p-5 gap-5">
      <div>
        <img src={auth.image} className="w-20 h-20 rounded-full" />
        {detailPost?.userId}
      </div>
      <div className="text-xs text-gray-500">{createdDate}</div>

      {/* 제목 */}
      <div className="text-2xl font-bold">{detailPost?.title}</div>
      {/* 내용 */}
      <div>{detailPost?.contents}</div>

      {/* 첨부된 이미지 */}
      {detailPost?.imageUrls.map((post, idx) => (
        <img
          src={post}
          key={idx}
          alt={detailPost?.title}
          className="w-30 h-30 rounded-md"
        />
      ))}

      {/* 글 즐겨찾기 */}
      <div onClick={favoriteHandler} className="flex">
        {favorite ? "❤️" : <LikeIcon />}
        {favoriteCount}
      </div>

      {/* 조회수 */}
      <div className="flex">
        <VeiwIcon /> {detailPost?.viewCount}
      </div>
      {/* 댓글수 */}
      <div className="flex">
        <CommentIcon /> {detailPost?.commentCount}
      </div>

      <div>{detailPost?.voteOption}</div>

      <button
        className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
        // onClick={handleLogin}
        onClick={deletePost}
      >
        삭제
      </button>
      <div>
        <WriteComment postId={parseInt(postId || "0")} />
        <CommentList postId={parseInt(postId || "0")} />
      </div>
    </div>
  );
};

export default DetailPost;
