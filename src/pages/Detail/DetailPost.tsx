import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../services/instance";
import { Posts } from "../../services/api/posts";

const DetailPost: React.FC = () => {
  const { postId } = useParams();

  const [detailPost, setDetailPost] = useState<Posts>();
  const [createdDate, setCreatedDate] = useState("");

  // 게시글 상세 정보 불러오기
  useEffect(() => {
    const getDetailPost = async () => {
      try {
        const { data } = await instance.get(`/api/post/${postId}`);
        setDetailPost(data.result);

        const formattingTime = data.result.createdAt?.replace(
          /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/,
          "$1.$2.$3 $4:$5"
        );

        setCreatedDate(formattingTime);
      } catch (e) {}
    };
    getDetailPost();
  }, []);

  const deletePost = async () => {
    try {
      await instance.delete(`/api/post/${postId}`);
    } catch (e) {
      alert("삭제 에러(작성자인지 확인)");
    }
  };

  return (
    <div>
      <div>제목: {detailPost?.title}</div>
      <div>{detailPost?.contents}</div>
      <div>{detailPost?.votingEnabled}</div>
      <div>{detailPost?.viewCount}</div>
      <div>{detailPost?.commentCount}</div>
      <div>{createdDate}</div>

      <button
        className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
        // onClick={handleLogin}
        onClick={deletePost}
      >
        삭제
      </button>
    </div>
  );
};

export default DetailPost;
