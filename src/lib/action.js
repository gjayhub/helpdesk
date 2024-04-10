"use server";

import { createClient } from "@/utils/supabase/server";
import moment from "moment";

export const logout = async () => {
  const supabase = createClient();
  await supabase.auth?.signOut();
};

export const createTicket = async (formData) => {
  const supabase = createClient();
  const user = await getProfile();
  const ticketData = {
    title: formData.get("title"),
    description: formData.get("desc"),
    priority: formData.get("priority"),
    category: formData.get("category"),
    progress: 0,
    status: "new",
    sender_id: user.id,
  };

  const { error } = await supabase.from("tickets").insert([ticketData]);
  console.log(error);
};

export const getProfile = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth?.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();
  if (error) {
    console.log(error);
  }

  return profile;
};

export const sendReply = async (ticket_id, formData) => {
  const supabase = createClient();
  const newReply = {
    response_text: formData.get("reply"),
    ticket_id,
  };

  const { data, error } = await supabase.from("responses").insert([newReply]);
  if (error) {
    console.log(error);
  }
};

export const getTickets = async (searchParams) => {
  const profile = await getProfile();
  const supabase = createClient();
  try {
    const { page, filter, query } = searchParams;

    const currPage = page || 1;
    const ticketPerPage = 10;
    const offsetPage = (currPage - 1) * ticketPerPage;

    let filterQuery = {};

    // if (profile.role === "user") {
    //   filterQuery.sender_id = profile.id;
    // } else {
    switch (filter) {
      case "all":
        break;
      case "ongoing":
        filterQuery.status = "ongoing";
        break;
      case "new":
        filterQuery.status = "new";
        break;
      case "resolved":
        filterQuery.status = "resolved";
        break;
      case "urgent":
        filterQuery.priority = "urgent";
        break;
    }
    // }
    let ticketData;
    if (query) {
      const { data: tickets, error } = await supabase
        .from("tickets")
        .select(
          `"*",
        profiles("*"),
        responses("*")`
        )
        .range(offsetPage, offsetPage + ticketPerPage - 1)
        .textSearch("fts", query, {
          type: "plain",
          config: "english",
        });

      ticketData = tickets;
    } else {
      let { data: tickets, error } = await supabase
        .from("tickets")
        .select(
          `"*",
        profiles("*"),
        responses("*")`
        )
        .range(offsetPage, offsetPage + ticketPerPage - 1)
        .match(filterQuery);
      ticketData = tickets;
    }
    return ticketData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReplies = async () => {};
