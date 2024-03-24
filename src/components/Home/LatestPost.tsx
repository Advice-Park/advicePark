import React, { useEffect, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";

const LatestPost: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      res ? setPosts(res) : console.log("글이 없습니다");
    });
  }, []);

  return (
    <>
      <div className="mb-0 m-5 flex justify-between">
        <h3 className="text-xl font-bold">최신 질문</h3>
        <span>더보기</span>
      </div>
      <div className="flex">
        {posts.map((post) => (
          <ul className="p-3 w-5/12 h-40 overflow-hidden" key={post.postId}>
            <li className="rounded-full px-3 pb-1 bg-gray-300 text-sm">{post.category}</li>
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
