import React, { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  close: () => void;
  parentFunction: (x: any) => void;
}
const CategoryModal: React.FC<Props> = ({ open, close, parentFunction }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState<number>();

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

    function handleClickOutside(event: React.MouseEvent<Document>) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
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
  const Categories = ["일상(잡답)", "연애", "운동", "음식", "기타"];

  parentFunction(category);

  const categoryHandler = (index: number) => {
    setIsActive(index);
    setCategory(Categories[index]);
  };

  return open ? (
    <>
      <div onClick={close} />
      <div ref={modalRef}>
        <div>
          <div>
            {Categories.map((item, idx) => (
              <div
                onClick={() => categoryHandler(idx)}
                key={idx}
                // isFirst={idx === 0}
                // isClicked={isActive}
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
