"use server";
import { createClient } from "@/utils/supabase/server";
export const allTicket = async () => {
  const supabase = createClient();
  const { data: tickets } = await supabase
    .from("tickets")
    .select(`"*",profiles("full_name")`);
  return tickets;
};
