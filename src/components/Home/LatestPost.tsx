import React, { useEffect, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";

const LatestPost: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      res ? setPosts(res) : console.log("글이 없습니다");
    });
  }, []);

  const postingCategory: { [key: string]: string } = {
    DAILY: "일상(잡담)",
    LOVE: "연애",
    EXERCISE: "운동",
    FOOD: "음식",
    ETC: "기타",
  };

  return (
    <>
      <div className="mb-0 m-5 flex justify-between">
        <h3 className="text-xl font-bold">최신 질문</h3>
        <span onClick={() => (window.location.href = "/posts")} className="cursor-pointer">더보기</span>
      </div>
      <div className="flex gap-3">
        {posts.map((post) => (
          <ul
            className="p-3 w-40 h-40 overflow-hidden bg-white cursor-pointer"
            key={post.postId}
            onClick={() => (window.location.href = `/posts/${post.postId}`)}
          >
            <li className="rounded-full px-3 pb-1 bg-gray-300 text-sm">
              {postingCategory[post.category]}
            </li>
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

// import { TouchEventHandler, useEffect, useRef, useState } from "react";
// import { Posts, getPosts } from "../../services/api/posts";

// let touchStartX: number;
// let touchEndX: number;

// const Carousel = () => {
//   const [posts, setPosts] = useState<Posts[]>([]);

//   const [currIndex, setCurrIndex] = useState(1);
//   const [currList, setCurrList] = useState<Posts[]>();

//   const carouselRef = useRef<HTMLUListElement>(null);

//   useEffect(() => {
//     getPosts().then((res) => {
//       res ? setPosts(res) : console.log("글이 없습니다");
//     });

//     if (posts.length !== 0) {
//       const startData = posts[0];
//       const endData = posts[posts.length - 1];
//       const newList = [endData, ...posts, startData];

//       setCurrList(newList);
//     }
//   }, [posts]);

//   useEffect(() => {
//     if (carouselRef.current !== null) {
//       carouselRef.current.style.transform = `translateX(-${currIndex}00%)`;
//     }
//   }, [currIndex]);

//   const moveToNthSlide = (index: number) => {
//     setTimeout(() => {
//       setCurrIndex(index);
//       if (carouselRef.current !== null) {
//         carouselRef.current.style.transition = "";
//       }
//     }, 500);
//   };

//   const handleSwipe = (direction: number) => {
//     const newIndex = currIndex + direction;

//     if (newIndex === posts.length + 1) {
//       moveToNthSlide(1);
//     } else if (newIndex === 0) {
//       moveToNthSlide(posts.length);
//     }

//     setCurrIndex((prev) => prev + direction);
//     if (carouselRef.current !== null) {
//       carouselRef.current.style.transition = "all 0.5s ease-in-out";
//     }
//   };

//   const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
//     touchStartX = e.nativeEvent.touches[0].clientX;
//   };

//   const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
//     const currTouchX = e.nativeEvent.changedTouches[0].clientX;

//     if (carouselRef.current !== null) {
//       carouselRef.current.style.transform = `translateX(calc(-${currIndex}00% - ${
//         (touchStartX - currTouchX) * 2 || 0
//       }px))`;
//     }
//   };

//   const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
//     touchEndX = e.nativeEvent.changedTouches[0].clientX;

//     if (touchStartX >= touchEndX) {
//       handleSwipe(1);
//     } else {
//       handleSwipe(-1);
//     }
//   };

//   const postingCategory: { [key: string]: string } = {
//     DAILY: "일상(잡담)",
//     LOVE: "연애",
//     EXERCISE: "운동",
//     FOOD: "음식",
//     ETC: "기타",
//   };

//   return (
//     <div className="flex align-center justify-center w-full">
//       <div
//         className="group relative w-full overflow-hidden p-xs"
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <button
//           type="button"
//           onClick={() => handleSwipe(-1)}
//           className="z-1000 group-hover:block absolute top-1/2 rounded-lg p-2 bg-gray-300 left-0 hidden"
//         >
//           왼
//         </button>
//         <button
//           type="button"
//           onClick={() => handleSwipe(1)}
//           className="z-1000 group-hover:block absolute top-1/2 rounded-lg p-2 bg-gray-300 right-0 hidden"
//         >
//           오
//         </button>
//         <ul ref={carouselRef} className="flex w-full">
//           {currList?.map((post, idx) => {
//             const key = `${post}-${idx}`;

//             return (
//               <li key={key} className="flex-none object-contain w-40 h-40">
//                 <ul
//                   className="flex flex-col w-full py-sm overflow-hidden cursor-pointer"
//                   key={post.postId}
//                   // onClick={() =>
//                   //   (window.location.href = `/posts/${post.postId}`)
//                   // }
//                 >
//                   <li className="rounded-full px-3 pb-1 bg-gray-300 text-sm">
//                     {postingCategory[post.category]}
//                   </li>
//                   <li className="font-bold">{post.title}</li>
//                   <li>{post.contents}</li>
//                   <li>{post.imageUrls.length > 0 ? "사진" : ""}</li>
//                   <li>{post.voteOption}</li>
//                 </ul>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
