import React from "react";

interface PrevImgprop {
  prevImg: string;
}

const PostImg: React.FC<PrevImgprop> = ({ prevImg }) => {
  return <img className="w-20 h-20 m-2" src={prevImg} />;
};

export default PostImg;
