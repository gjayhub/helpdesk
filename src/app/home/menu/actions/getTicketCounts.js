"use server";

import { createClient } from "@/utils/supabase/server";
export const ticketCounts = async () => {
  const supabase = createClient();

  // Define an array of promises for each count operation
  const promises = [
    supabase
      .from("tickets")
      .select(`"*",profiles("full_name")`, { count: "exact", head: true })
      .eq("status", "new")
      .then(({ count }) => count),

    supabase
      .from("tickets")
      .select(`"*",profiles("full_name")`, { count: "exact", head: true })
      .eq("status", "ongoing")
      .then(({ count }) => count),

    supabase
      .from("tickets")
      .select(`"*",profiles("full_name")`, { count: "exact", head: true })
      .eq("status", "resolved")
      .then(({ count }) => count),

    supabase
      .from("tickets")
      .select(`"*",profiles("full_name")`, { count: "exact", head: true })
      .eq("priority", "urgent")
      .then(({ count }) => count),

    supabase
      .from("tickets")
      .select(`"*",profiles("full_name")`, { count: "exact", head: true })
      .then(({ count }) => count),
  ];

  // Wait for all promises to resolve
  const [newTickets, ongoingTickets, resolvedTickets, urgentTickets, total] =
    await Promise.all(promises);

  return { total, newTickets, resolvedTickets, urgentTickets, ongoingTickets };
};
