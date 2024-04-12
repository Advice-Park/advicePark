import React from "react";

interface PrevImgprop {
  prevImg: string | React.ReactElement;
}

const PostImg: React.FC<PrevImgprop> = ({ prevImg }) => {
  return (
    <div>
      {typeof prevImg === "string" ? (
        <img className="w-20 h-20 m-2" src={prevImg} alt="preview" />
      ) : (
        prevImg
      )}
    </div>
  );
};

export default PostImg;
