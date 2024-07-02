import React, { useEffect, useState } from "react";
import { instance } from "../../services/instance";

interface Image {
  imageId: number;
  postId: number;
  storedImagePath: string;
}
const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const getImages = async () => {
      const res = await instance.get("/api/image");
      return res.data.result;
    };
    getImages().then((res) => {
      setImages(res);
    });
  }, []);

  return (
    <div className="m-5 p-4 bg-white rounded-lg flex flex-wrap justify-around">
      {images.map((img) => (
        <div
          key={img.imageId}
          className="w-20 m-1 p-2 border rounded cursor-pointer"
          onClick={() => (window.location.href = `/posts/${img.postId}`)}
        >
          <img src={img.storedImagePath} alt={`postImg ${img.imageId}`} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
