import React, { ChangeEvent, useState } from "react";
import PostImg from "./img/PostImg";

interface SetImgsProps {
  setImgs: React.Dispatch<React.SetStateAction<File[]>>;
}

const PostFooter: React.FC<SetImgsProps> = ({ setImgs }) => {
  // 프리뷰 관리
  const [prevImgs, setPrevImgs] = useState<string[]>([]);

  const imgOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // const files = Array.from(e.target.files).slice(0, 4); // 첨부 파일 개수 최대 4개
    const fileList = e.target.files;
    if (fileList) {
      Array.from(fileList).slice(0, 4); // 첨부 파일 개수 최대 4개
    }

    // PostPage로 데이터 올림
    if (fileList) {
      const filesArray = Array.from(fileList);
      setImgs(filesArray);
    }

    // 프리뷰
    const images: string[] = [];
    if (fileList) {
      for (const file of fileList) {
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = (e) => {
          images.push(e.target?.result as string);
          if (images.length === fileList.length) {
            setPrevImgs(images);
          }
        };
      }
    }
  };

  // 이미지 업로드 취소 버튼 핸들러
  const CancleHandler = () => {
    setPrevImgs([]);
    setImgs([]);
  };

  return (
    <div className="fixed bottom-0 w-full">
      {prevImgs.length !== 0 && (
        <div>
          <span onClick={CancleHandler}>이미지 업로드 취소</span>
          <div>
            {[...Array(4)].map((_, i) => (
              <PostImg
                key={i}
                prevImg={i < prevImgs.length ? prevImgs[i] : "none"}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <nav>
          &nbsp;
          <label>
            <span>이미지는 4장까지 업로드 가능합니다.</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={imgOnchangeHandler}
              className="hidden"
            />
            <div>첨부</div>
          </label>
        </nav>
      </div>
    </div>
  );
};

export default PostFooter;
