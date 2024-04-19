import { TouchEventHandler, useEffect, useRef, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";
import CameraIcon from "../../assets/icons/camera.svg?react";
import FormattingCat from "../format/FormattingCat";

let touchStartX: number;
let touchEndX: number;

const Carousel = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  const [currIndex, setCurrIndex] = useState(1);
  const [currList, setCurrList] = useState<Posts[]>();

  const carouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const getPostsList = async () => {
      const res = await getPosts();
      if (res) {
        setPosts(res);
      } else {
        console.log("글이 없습니다");
      }
    };
    getPostsList();
  }, []);

  useEffect(() => {
    if (posts.length !== 0) {
      // 맨앞, 뒤에 마지막, 첫번째 요소를 추가해 연결되어 보이는 효과
      const startData = posts[0];
      const endData = posts[posts.length - 1];
      const newList = [endData, ...posts, startData];
      setCurrList(newList);
    }
  }, [posts]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${
        currIndex * 33.33
      }%)`;
    }
  }, [currIndex]);

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
      carouselRef.current.style.transform = `translateX(calc(-${
        currIndex * 33.33
      }% - ${(touchStartX - currTouchX) * 2 || 0}px))`;
    }
  };

  return (
    <div className="flex align-center justify-center w-full">
      <div
        className="group relative w-full p-xs overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={() => moveHandler(-1)}
          className="z-10 group-hover:block absolute top-1/2 rounded-lg py-1 px-2 bg-gray-200 left-0 hidden cursor-pointer"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => moveHandler(1)}
          className="z-10 group-hover:block absolute top-1/2 rounded-lg py-1 px-2 bg-gray-200 right-0 hidden cursor-pointer"
        >
          →
        </button>
        <ul ref={carouselRef} className="flex w-full">
          {currList?.map((post, idx) => {
            const key = `${post}-${idx}`;

            return (
              <li key={key} className="flex-none object-contain p-1 w-40">
                <ul
                  className="flex flex-col items-start shrink-0 p-3 h-40 rounded-xl overflow-hidden bg-white cursor-pointer"
                  key={post.postId}
                  onClick={() =>
                    (window.location.href = `/posts/${post.postId}`)
                  }
                >
                  <li className="rounded-full px-3 p-1 mb-1 text-white bg-light-blue">
                    <FormattingCat category={post.category} />
                  </li>
                  <li className="font-bold">{post.title}</li>
                  <li>{post.contents}</li>
                  <li>{post.imageUrls.length > 0 ? <CameraIcon /> : ""}</li>
                  <li>{post.postVoteOption}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
