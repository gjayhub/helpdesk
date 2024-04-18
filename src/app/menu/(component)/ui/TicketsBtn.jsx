import React from "react";
import Link from "next/link";

const TicketsBtn = ({ total, id }) => {
  const ticketCount = total[0];
  return <Link href={`/?id=${id}`}>{ticketCount.count}</Link>;
};

export default TicketsBtn;
