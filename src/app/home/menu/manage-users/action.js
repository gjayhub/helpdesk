"use server";

import { createClient } from "@/utils/supabase/server";

import { createClient as adminSupabase } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = adminSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Access auth admin api
const adminAuthClient = supabase.auth.admin;

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
    .range(offsetPage, offsetPage + ticketPerPage - 1)
    .neq("role", "admin");

  if (error) {
    console.log(error);
  }

  return { users, count };
};

export const deleteUser = async (userId, formData) => {
  const { data, error } = await adminAuthClient.deleteUser(userId);
};
export const editUser = async (userId, prevState, formData) => {
  const supabase = createClient();
  const email = formData.get("email");
  const full_name = formData.get("fullname");
  const password = formData.get("password");
  try {
    if (full_name) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name })
        .eq("id", userId);
      if (profileError) {
        console.log(profileError);
        return { message: profileError.message };
      }
    }
    if (password) {
      const { data: user, error: passwordError } =
        await adminAuthClient.updateUserById(userId, { password });

      if (passwordError) {
        console.log(passwordError.message);
        return { message: passwordError.message };
      }
    }
    if (email) {
      const { data: user, error: emailError } =
        await adminAuthClient.updateUserById(userId, { email });

      if (emailError) {
        console.log(emailError.message);
        return { message: emailError.message };
      }

      const { error: profileEmailError } = await supabase
        .from("profiles")
        .update({ email })
        .eq("id", userId);
      if (profileEmailError) {
        console.log(profileEmailError.message);
        return { message: profileEmailError.message };
      }
    }

    revalidatePath("/home/menu/manage-users");
    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Error occurred while editing user.");
  }
};
export const blockUser = async (userId) => {
  const { data: user, error } = await supabase.auth.admin.updateUserById(
    userId,
    { ban_dura }
  );
};
