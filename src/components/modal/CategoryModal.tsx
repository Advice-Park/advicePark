import React, { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  close: () => void;
  parentFunction: (x: any) => void;
}
const CategoryModal: React.FC<Props> = ({ open, close, parentFunction }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState<number | undefined>();

  const closeModal = () => {
    close();
  };

  useEffect(() => {
    function handleCategorySetUp() {
      if (isActive !== null) {
        return closeModal();
      }
    }
    handleCategorySetUp();

    function handleClickOutside(event: Event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        open
      ) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, isActive]);

  const [category, setCategory] = useState("카테고리");
  const Categories = ["일상(잡담)", "연애", "운동", "음식", "기타"];

  const categoryHandler = (index: number) => {
    setIsActive(index);
    setCategory(Categories[index]);
    parentFunction(category);
  };

  return open ? (
    <>
      <div
        onClick={close}
        className="fixed top-0 w-full h-full bg-black opacity-30"
      />
      <div
        ref={modalRef}
        className="z-3 fixed bottom-0 w-full h-md py-8 shadow bg-white"
      >
        <div className="flex">
          <div className="flex flex-col w-full h-full">
            {Categories.map((item, idx) => (
              <div
                onClick={() => categoryHandler(idx)}
                key={idx}
                // isFirst={idx === 0}
                // isClicked={isActive}
                className="w-full px-5 p-3 cursor-pointer hover:text-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default CategoryModal;
