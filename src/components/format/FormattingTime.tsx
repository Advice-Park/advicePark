import { useState, useEffect } from "react";

type DataProps = {
  createdTime: string;
};

const FormattingTime = ({ createdTime }: DataProps) => {
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    const formattingTime = createdTime?.replace(
      /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/,
      "$1.$2.$3 $4:$5"
    );
    setCreatedDate(formattingTime);
  }, [createdTime]);

  return <span className="text-xs text-gray-500">{createdDate}</span>;
};

export default FormattingTime;
