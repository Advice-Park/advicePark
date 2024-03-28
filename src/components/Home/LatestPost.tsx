import React, { useEffect, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";

const LatestPost: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      res ? setPosts(res) : console.log("글이 없습니다");
    });
  }, []);

  const postingCategory: { [key: string]: string } = {
    DAILY: "일상(잡담)",
    LOVE: "연애",
    EXERCISE: "운동",
    FOOD: "음식",
    ETC: "기타",
  };

  return (
    <>
      <div className="mb-0 m-5 flex justify-between">
        <h3 className="text-xl font-bold">최신 질문</h3>
        <span>더보기</span>
      </div>
      <div className="flex gap-3">
        {posts.map((post) => (
          <ul
            className="p-3 w-40 h-40 overflow-hidden bg-white cursor-pointer"
            key={post.postId}
            onClick={() => (window.location.href = `/posts/${post.postId}`)}
          >
            <li className="rounded-full px-3 pb-1 bg-gray-300 text-sm">
              {postingCategory[post.category]}
            </li>
            <li className="font-bold">{post.title}</li>
            <li>{post.contents}</li>
            <li>{post.imageUrls.length > 0 ? "사진" : ""}</li>
            <li>{post.voteOption}</li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default LatestPost;
