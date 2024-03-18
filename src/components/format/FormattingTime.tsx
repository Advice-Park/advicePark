import { useState } from "react";

type DataProps = {
  createdTime: string;
};

const FormattingTime = ({ createdTime }: DataProps) => {
  const [createdDate, setCreatedDate] = useState("");

  const formattingTime = createdTime?.replace(
    /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/,
    "$1.$2.$3 $4:$5"
  );

  setCreatedDate(formattingTime);

  return <div className="text-xs text-gray-500">{createdDate}</div>;
};

export default FormattingTime;
