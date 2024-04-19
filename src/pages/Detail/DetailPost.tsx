import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import { getUserInfoWithId } from "../../services/api/user";
import FormattingTime from "../../components/format/FormattingTime";

const DetailPost: React.FC = () => {
  const { postId } = useParams();

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
        <div className="w-full text-2xl font-bold pb-5 border-b">
          {detailPost?.title}
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

        <div>{detailPost?.voteOption}</div>

        {/* 작성자에게만 삭제버튼 노출 */}
        {auth.userId === detailPost?.userId && (
          <button
            className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
            // onClick={handleLogin}
            onClick={deletePost}
          >
            삭제
          </button>
        )}
      </div>
      <div>
        <CommentList postId={parseInt(postId || "0")} />
      </div>
    </>
  );
};

export default DetailPost;
