"use server";

import { createClient } from "@/utils/supabase/server";

export const getTicketPerMonth = async (month) => {
  let { startDate, endDate } = month;
  const supabase = createClient();
  startDate = "2024-04-01";
  endDate = "2024-04-30";
  const { data: tickets } = await supabase
    .from("tickets")
    .select(`"*"`)
    .gt("created_at", startDate)
    .lt("created_at", endDate);

  return tickets;
};
