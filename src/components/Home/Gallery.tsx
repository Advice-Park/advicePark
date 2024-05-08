import React, { useEffect, useState } from "react";
import { getPosts, Posts } from "../../services/api/posts";

const Gallery: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      if (res && res.length > 0) {
        setPosts(res);
      } else {
        console.log("글이 없습니다");
      }
    });
  }, []);

  return (
    <div className="m-5 bg-white flex">
      {posts.map((post) => (
        <>
          {post.imageUrls.length > 0 && (
            <div key={post.postId} className="w-1/6 m-5">
              {post.imageUrls.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Post Images ${index}`} />
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Gallery;
