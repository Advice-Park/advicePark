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
    <div className="m-5 p-3 bg-white rounded-lg flex">
      {posts.map((post) => (
        <>
          {post.imageUrls.length > 0 && (
            <div key={post.postId} className="w-1/6 m-2 p-2 border rounded">
              {post.imageUrls.map((imageUrl, index) => (
                <div>
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Post Images ${index}`}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Gallery;
