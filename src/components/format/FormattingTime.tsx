import { useState, useEffect } from "react";

type DataProps = {
  createdTime: string;
};

const FormattingTime = ({ createdTime }: DataProps) => {
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    const utcDate = new Date(createdTime);
    const year = utcDate.getFullYear();
    const month = utcDate.getMonth() + 1;
    const day = utcDate.getDate();
    const hour = utcDate.getHours();
    const minute = utcDate.getMinutes();

    const formattedDate = `${year}. ${month}. ${day} `;
    const formattedTime = `${hour}:${minute}`;

    setCreatedDate(`${formattedDate}오전 ${formattedTime}`);
  }, [createdTime]);

  return <span className="text-xs text-gray-400">{createdDate}</span>;
};

export default FormattingTime;
