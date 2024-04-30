import { TouchEventHandler, useEffect, useRef, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";
import CameraIcon from "../../assets/icons/camera.svg?react";
import FormattingCat from "../format/FormattingCat";

let touchStartX: number;
let touchEndX: number;

const HotPost = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  const [currIndex, setCurrIndex] = useState(1);
  const [currList, setCurrList] = useState<Posts[]>();

  const carouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    getPosts().then((res) => {
      if (res) {
        const sortedPosts = res.sort((a, b) => {
          if (b.commentCount === a.commentCount) {
            return b.favoriteCount - a.favoriteCount;
          }
          return b.commentCount - a.commentCount;
        });
        setPosts(sortedPosts);
      } else {
        console.log("글이 없습니다");
      }
    });
  }, []);

  useEffect(() => {
    if (posts.length !== 0) {
      const startData = posts[0];
      const endData = posts[posts.length - 1];
      const newList = [endData, ...posts, startData];
      setCurrList(newList);
    }
  }, [posts]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currIndex}00%)`;
    }
  }, [currIndex, currList]);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = "";
      }
    }, 500);
  };

  // 이동할 direction(1은 오른쪽, -1은 왼쪽)을 받아 이동
  const moveHandler = (direction: number) => {
    const newIndex = currIndex + direction;

    if (newIndex === posts.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(posts.length);
    }

    setCurrIndex((prev) => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = "all 0.5s ease-in-out";
    }
  };

  // 터치 이벤트
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;

    // 왼쪽에서 오른쪽으로 밀 때는 x좌표값 증가, 반대의 경우 x좌표값 감소
    if (touchStartX >= touchEndX) {
      moveHandler(1);
    } else {
      moveHandler(-1);
    }
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const currTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(calc(-${currIndex}00% - ${
        (touchStartX - currTouchX) * 2 || 0
      }px))`;
    }
  };

  return (
    <div className="flex align-center justify-center w-full mt-2">
      <div
        className="group relative w-full p-xs overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={() => moveHandler(-1)}
          className="z-10 group-hover:block absolute top-1/2 -translate-y-2/4 rounded-lg py-1 px-2 bg-gray-200 left-0 hidden cursor-pointer"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => moveHandler(1)}
          className="z-10 group-hover:block absolute top-1/2 -translate-y-2/4 rounded-lg py-1 px-2 bg-gray-200 right-0 hidden cursor-pointer"
        >
          →
        </button>
        <ul ref={carouselRef} className="flex w-full">
          {currList?.map((post, idx) => {
            const key = `${post}-${idx}`;

            return (
              <li
                key={key}
                className="flex-none h-44 object-contain px-5 w-full"
              >
                <ul
                  className="flex flex-col justify-between items-start shrink-0 p-3 h-40 rounded-xl overflow-hidden bg-white cursor-pointer drop-shadow-md"
                  key={post.postId}
                  onClick={() =>
                    (window.location.href = `/posts/${post.postId}`)
                  }
                >
                  <li className="flex gap-1 items-center mb-1">
                    <span className="rounded-full px-3 p-1 text-white bg-light-blue text-sm">
                      <FormattingCat category={post.category} />
                    </span>
                    {post.postVoteOption === "YES_NO" ? (
                      <span className="rounded-full text-mid-blue text-sm">
                        찬반💥
                      </span>
                    ) : null}
                  </li>

                  <li className="w-full font-bold flex justify-between">
                    {post.title}
                    {post.imageUrls.length > 0 ? <CameraIcon /> : ""}
                  </li>
                  <li className="text-sm text-gray-500 inline-block overflow-hidden leading-4 h-8 text-wrap">
                    {post.contents}
                  </li>

                  <ul className="w-full flex gap-5 pt-2 border-t">
                    {/* 글 즐겨찾기 */}
                    <li className="icon-layout">
                      <LikeIcon /> {post.favoriteCount}
                    </li>

                    {/* 댓글수 */}
                    <li className="icon-layout">
                      <CommentIcon /> {post.commentCount}
                    </li>

                    {/* 조회수 */}
                    <li className="icon-layout">
                      <VeiwIcon /> {post.viewCount}
                    </li>
                  </ul>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HotPost;
