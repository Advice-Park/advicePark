import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/instance";
import PostFooter from "../../components/footer/PostFooter";
import CategoryModal from "../../components/modal/CategoryModal";
import { addComment, getChatGpt } from "../../services/api/comment";
import VoteIcon from "../../assets/icons/vote.svg?react";
import { Posts } from "../../services/api/posts";

const PostPage: React.FC = () => {
  const navi = useNavigate();

  const WriteCallback = (cat: string) => {
    setCategory(cat);
  };

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [voting, setVoting] = useState<Posts["postVoteOption"]>("NORMAL");
  const [imgs, setImgs] = useState<File[]>([]);

  const [voteSt, setVoteSt] = useState<string>(
    "border rounded-full py-1 px-2 w-32"
  );

  // 전송용 카테고리 키워드
  const postingCategory: { [key: string]: string } = {
    "일상(잡담)": "DAILY",
    연애: "LOVE",
    운동: "EXERCISE",
    음식: "FOOD",
    기타: "ETC",
  };
  const selectCat = postingCategory[category];

  // 찬반 옵션 체크 (찬반 or 일반)
  const votingHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVoting(e.target.checked ? "YES_NO" : "NORMAL");
    setVoteSt(
      e.target.checked
        ? "border rounded-full py-1 px-2 w-32 border-dark-blue"
        : "border rounded-full py-1 px-2 w-32"
    );
  };

  // 게시글 등록
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("category", selectCat);
    formData.append("postVoteOption", voting);

    for (let i = 0; i < imgs.length; i++) {
      formData.append("imageFiles", imgs[i]);
    }

    if (title.length < 3 || title.length > 25) {
      alert("제목은 3자 이상, 25자 이하여야 합니다!");
      return;
    }

    if (contents.length < 10 || contents.length > 1000) {
      alert("내용은 10자 이상, 1000자 이하여야 합니다!");
      return;
    }

    if (category === "카테고리") {
      alert("카테고리를 선택해 주세요.");
      return;
    }

    // setLoading(true);

    try {
      const res = await instance.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setLoading(false);
      alert("글 작성에 성공하였습니다.");
      console.log(formData);
      navi(`/posts/${res.data.result.postId}`);

      // ChatGPT 요청 API
      getChatGpt(contents).then((resGPT: any) => {
        if (resGPT) {
          // 글작성 응답으로 받은 postId 활용
          addComment(res.data.result.postId, resGPT, "AI");
        }
      });
    } catch (e: any) {
      console.log("글 작성 에러 :", e);
    }
  };

  // 취소 버튼
  const handleCanc = () => {
    navi(-1);
  };

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const categoryOpen = () => {
    setIsCategoryModalOpen(true);
  };

  const categoryClose = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <form onSubmit={submitHandler} className="w-full h-full bg-white">
      <div className="flex justify-between w-full px-5 py-3 border-b">
        <button onClick={handleCanc}>취소</button>
        <button type="submit">등록</button>
      </div>

      <div className="relative w-full px-8 py-3">
        <div className="flex flex-col gap-1">
          <p onClick={categoryOpen} className="m-auto cursor-pointer">
            {category}
          </p>
          <label className={voteSt} htmlFor="vote">
            <span className="flex gap-1 justify-evenly text-sm items-center">
              <VoteIcon />
              찬반투표 추가
            </span>
          </label>
          <input
            id="vote"
            type="checkbox"
            checked={voting === "YES_NO"}
            onChange={votingHandler}
            className="appearance-none"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
            placeholder="제목"
            className="w-full p-3 border-b"
          />
          <textarea
            value={contents}
            onChange={(e) => {
              setContents(e.target.value);
            }}
            placeholder="훈수 받고 싶은 내용을 입력하세요."
            className="w-full px-3 resize-none min-h-72"
          />
        </div>
      </div>
      <PostFooter setImgs={setImgs} />
      <CategoryModal
        open={isCategoryModalOpen}
        close={categoryClose}
        parentFunction={WriteCallback}
      />
    </form>
  );
};

export default PostPage;
