import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/instance";
import PostFooter from "../../components/footer/PostFooter";
import CategoryModal from "../../components/modal/CategoryModal";

const PostPage: React.FC = () => {
  const navigate = useNavigate();

  const WriteCallback = (x: any) => {
    setCategory(x);
  };

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [voting, setVoting] = useState(false);
  const [imgs, setImgs] = useState<File[]>([]);

  // 전송용 카테고리 키워드
  const postingCategory: { [key: string]: string } = {
    "일상(잡담)": "DAILY",
    "연애": "LOVE",
    "운동": "EXERCISE",
    "음식": "FOOD",
    "기타": "ETC",
  };
  const selectCat = postingCategory[category];

  // 게시글 등록
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("category", selectCat);
    formData.append("votingEnabled", voting.toString());

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
      await instance.post("/api/post", formData);
      // setLoading(false);
      alert("글 작성에 성공하였습니다.");
      console.log(formData);
      navigate("/posts");
    } catch (e: any) {
      // const errorMsg = e.response.data.message;
      // alert(`${errorMsg}`);
      console.log(e);
    }
  };

  // 취소 버튼
  const handleCanc = () => {
    navigate(-1);
  };

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const categoryOpen = () => {
    setIsCategoryModalOpen(true);
  };

  const categoryClose = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <p onClick={handleCanc}>취소</p>
          <button type="submit">등록</button>
        </div>

        <div>
          <div className="flex flex-col">
            <p onClick={categoryOpen}>{category}</p>
            <label>
              <input
                type="checkbox"
                checked={voting}
                onChange={() => setVoting(!voting)}
              />
              <span>찬반</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              autoFocus
              placeholder="제목"
            />
            <textarea
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
              }}
              placeholder="훈수 받고 싶은 내용을 입력하세요."
            />
          </div>
          <PostFooter setImgs={setImgs} />
          {/* {isCategoryModalOpen && ( */}
          <CategoryModal
            open={isCategoryModalOpen}
            close={categoryClose}
            parentFunction={WriteCallback}
          />
          {/* )} */}
        </div>
      </form>
    </>
  );
};

export default PostPage;
