import React, { ChangeEvent, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg?react";
import { instance } from "../../services/instance";
import { Posts } from "../../services/api/posts";
import { Comment } from "../../services/api/comment";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [postData, setPostData] = useState<Posts[]>();
  const [commentData, setCommentData] = useState<Comment[]>();

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
      <div className="flex justify-center items-center gap-2 px-8 py-3 bg-white">
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
      <div>
        {postData?.length === 0 && commentData?.length === 0 ? (
          <span>검색결과가 없습니다.</span>
        ) : (
          postData?.map((post) => (
            <div key={post.postId}>
              <p>{post.title}</p>
              <p>{post.contents}</p>
            </div>
          )) &&
          commentData?.map((post) => (
            <div key={post.postId}>
              <p>{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
