import { useState, useEffect } from "react";

type DataProps = {
  createdTime: string;
};

const FormattingTime = ({ createdTime }: DataProps) => {
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    const utcDate = new Date(createdTime);
    const koreaDate = utcDate.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      month: "numeric",
      day: "numeric",
    });

    // 날짜 뒤의 마침표 제거(마지막에 있는 마침표 제거)
    const lastDotIndex = koreaDate.lastIndexOf(".");
    const formattedDate =
      lastDotIndex !== -1
        ? koreaDate.slice(0, lastDotIndex) + koreaDate.slice(lastDotIndex + 1)
        : koreaDate;

    setCreatedDate(formattedDate);
  }, [createdTime]);

  return <span className="text-xs text-gray-400">{createdDate}</span>;
};

export default FormattingTime;
