import React from "react";

interface PrevImgprop {
  prevImg: string;
}

const PostImg: React.FC<PrevImgprop> = ({ prevImg }) => {
  return <img className="w-72 h-72" src={prevImg} />;
};

export default PostImg;
