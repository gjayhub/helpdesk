"use server";
import { createClient } from "@/utils/supabase/server";

export const getUsers = async (searchParams) => {
  const { page } = searchParams;

  const currPage = page || 1;
  const ticketPerPage = 10;
  const offsetPage = (currPage - 1) * ticketPerPage;

  const supabase = createClient();
  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" });
  const { data: users, error } = await supabase
    .from("profiles")
    .select("*, tickets!inner(count)")
    .range(offsetPage, offsetPage + ticketPerPage - 1);

  if (error) {
    console.log(error);
  }

  return { users, count };
};
