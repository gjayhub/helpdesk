"use server";

import { createClient } from "@/utils/supabase/server";
import { deleteCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

import moment from "moment";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { Resend } from "resend";
import EmailTemplate from "@/components/ui/EmailTemplate";

export const logout = async () => {
  const supabase = createClient();
  await supabase.auth?.signOut();
  redirect("/Login");
};

export const createTicket = async (prevState, formData) => {
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

  const { data: ticketRes, error } = await supabase
    .from("tickets")
    .insert([ticketData])
    .select(`"*",profiles("*")`);

  const newTicket = ticketRes[0];
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["geejayrivera@gmail.com"],
    subject: "A new ticket is created",
    react: EmailTemplate({
      url: `http://localhost:3000/?id=${newTicket.ticket_id}`,
      name: newTicket.profiles.full_name,
    }),
  });

  return { status: "success" };
};

export const deleteTicket = async (ticket_id) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tickets")
    .delete()
    .eq("ticket_id", ticket_id);
  revalidatePath("/home");
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

export const updateProfile = async (prevState, formData) => {
  const email = formData.get("email");
  const full_name = formData.get("fullname");
  const supabase = createClient();
  const profile = await getProfile();
  try {
    if (email) {
      await updateUserEmail(email, profile.id, supabase);
    }

    if (full_name) {
      await updateFullName(full_name, profile.id, supabase);
    }
    revalidatePath("/");
    return { status: "success" };
  } catch (error) {
    console.log(error);
  }
};

const updateUserEmail = async (email, profileId, supabase) => {
  const { user, error } = await supabase.auth.updateUser({ email });
  if (!error) {
    await supabase.from("profiles").update({ email }).eq("id", profileId);
  }
};

export const updateFullName = async (fullName, profileId, supabase) => {
  await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", profileId);
};

export const sendReply = async (ticket_id, formData) => {
  const supabase = createClient();
  const profile = await getProfile();
  const newReply = {
    response_text: formData.get("reply"),
    ticket_id,
    sender_name: profile?.full_name,
  };

  const { data, error } = await supabase.from("responses").insert([newReply]);
  if (error) {
    console.log(error);
  }
};

export const getTickets = async (searchParams) => {
  try {
    const { page = 1, filter, query, id, day, ticketId } = searchParams;
    const profile = await getProfile();
    const supabase = createClient();

    const ticketPerPage = 10;
    const offsetPage = (page - 1) * ticketPerPage;

    let filterQuery = {};
    if (profile?.role === "user") {
      filterQuery.sender_id = profile.id;
    }

    let startDay, endDay;
    if (day) {
      startDay = new Date(day);
      endDay = new Date(day);
      endDay.setDate(endDay.getDate() + 1); // Next day
    }

    switch (filter) {
      case "urgent":
        filterQuery.priority = "urgent";
        break;
      case "ongoing":
      case "new":
      case "resolved":
        filterQuery.status = filter;
        break;
    }

    let queryBuilder = supabase
      .from("tickets")
      .select(`"*", profiles("*"), responses("*")`)
      .range(offsetPage, offsetPage + ticketPerPage - 1);

    if (Object.keys(filterQuery).length !== 0) {
      queryBuilder = queryBuilder.match(filterQuery);
    }

    if (query) {
      queryBuilder = queryBuilder.textSearch("fts", query, {
        type: "plain",
        config: "english",
      });
    } else if (id) {
      queryBuilder = queryBuilder.eq("sender_id", id);
    }
    if (ticketId) {
      queryBuilder = queryBuilder.eq("ticket_id", ticketId);
    }

    if (day) {
      queryBuilder = queryBuilder
        .gt("created_at", startDay.toISOString())
        .lt("created_at", endDay.toISOString());
    }

    const { data: tickets, error } = await queryBuilder.order("created_at", {
      ascending: false,
    });

    if (error) {
      throw new Error(error.message || "Error fetching tickets");
    }

    return tickets;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStatus = async (id, formData) => {
  const progress = formData.get("progress");
  const supabase = createClient();
  let status;
  if (progress === 0) status = "new";
  if (progress > 0 && progress < 100) status = "ongoing";
  if (progress === 100) status = "resolved";
  const { data, error } = await supabase
    .from("tickets")
    .update({ progress })
    .eq("ticket_id", id)
    .select();
};
