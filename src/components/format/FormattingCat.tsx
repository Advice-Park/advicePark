type DataProps = {
  category: string;
};

const FormattingCat = ({ category }: DataProps) => {
  const postingCategory: { [key: string]: string } = {
    DAILY: "일상(잡담)",
    LOVE: "연애",
    EXERCISE: "운동",
    FOOD: "음식",
    ETC: "기타",
  };
  return <span className="text-sm">{postingCategory[category]}</span>;
};

export default FormattingCat;
