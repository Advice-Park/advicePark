import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../services/instance";
import { Posts } from "../../services/api/posts";
import CommentList from "../../components/comment/CommentList";
import WriteComment from "../../components/comment/WriteComment";

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

        const formattingTime = data.result.createdTime?.replace(
          /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/,
          "$1.$2.$3 $4:$5"
        );

        console.log(formattingTime);

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
    <div className="flex flex-col p-5 gap-5">
      <div>글쓴이 {detailPost?.userId}</div>
      <div className="text-xs text-gray-500">{createdDate}</div>

      <div>제목: {detailPost?.title}</div>
      <div>{detailPost?.contents}</div>
      <div>{detailPost?.voteOption}</div>
      <div>{detailPost?.viewCount}</div>
      <div>{detailPost?.commentCount}</div>

      <button
        className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
        // onClick={handleLogin}
        onClick={deletePost}
      >
        삭제
      </button>
      <div>
        <WriteComment />
        <CommentList postId={parseInt(postId || "0")} />
      </div>
    </div>
  );
};

export default DetailPost;
