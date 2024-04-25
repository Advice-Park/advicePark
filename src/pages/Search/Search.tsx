import React, { ChangeEvent, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg?react";
import { instance } from "../../services/instance";
import { Posts } from "../../services/api/posts";
import { Comment } from "../../services/api/comment";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [postData, setPostData] = useState<Posts[]>([]);
  const [commentData, setCommentData] = useState<Comment[]>([]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchHandler = async () => {
    try {
      const pRes = await instance.get("/api/search/post", {
        params: {
          keyword: search,
        },
      });
      const cRes = await instance.get("/api/search/comment", {
        params: {
          keyword: search,
        },
      });
      setPostData(pRes.data);
      setCommentData(cRes.data);
      setSearch("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center text-lg font-bold px-8 py-3 border-b bg-white">
        <span
          className="text-center cursor-pointer"
          onClick={() => window.history.back()}
        >
          &lt;
        </span>
        <h2>검색하기</h2>
        <span></span>
      </div>
      <div className="flex justify-center items-center gap-2 px-8 py-3 drop-shadow bg-white">
        <SearchIcon className="absolute mr-64" />
        <input
          required
          className="h-10 pl-12 p-2 rounded-md bg-gray-100"
          placeholder="검색어를 입력하세요"
          maxLength={20}
          onChange={inputHandler}
          value={search}
        />
        <button onClick={searchHandler}>검색</button>
      </div>
      <div className="h-screen pt-3 bg-white">
        {postData?.length === 0 && commentData?.length === 0 ? (
          <p className="pt-8 text-center">검색결과가 없습니다.</p>
        ) : (
          <>
            <div className="mb-8">
              {postData?.length > 0 && <h3 className="h2-primary">질문글</h3>}
              {postData?.map((post) => (
                <div
                  key={post.postId}
                  className="py-3 px-8 border-b"
                  onClick={() =>
                    (window.location.href = `/posts/${post.postId}`)
                  }
                >
                  <p className="font-bold text-lg">{post.title}</p>
                  <p className="text-gray-400">{post.contents}</p>
                </div>
              ))}
            </div>
            <div>
              {commentData?.length > 0 && (
                <h3 className="h2-primary">훈수댓글</h3>
              )}
              {commentData?.map((comment) => (
                <div
                  key={comment.commentId}
                  className="py-3 px-8 border-b"
                  onClick={() =>
                    (window.location.href = `/posts/${comment.postId}`)
                  }
                >
                  <span className="font-bold">
                    {comment.commentType === "AI" ? "AI" : comment.userId} :
                  </span>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
