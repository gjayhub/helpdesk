import React from "react";
import Linechart from "./Linechart";
import { getTicketPerMonth } from "./action";
import MonthPicker from "./MonthPicker";

const Overview = async ({ searchParams }) => {
  const month = {
    startDate: "2024-04-01",
    endDate: "2024-04-30",
  };

  const tickets = await getTicketPerMonth(month);

  return (
    <div>
    
      <Linechart />
    </div>
  );
};

export default Overview;
