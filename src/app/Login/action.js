"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { setCookie, deleteCookie } from "cookies-next";

export async function login(prevState, formData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const {
    data: { user },
    error,
  } = await supabase.auth?.signInWithPassword(data);
  if (!error) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
  } else {
    return { error: error.message.toString() };
  }

  redirect("/home");
}

export async function signup(prevState, formData) {
  const supabase = createClient();

  const newUserData = {
    email: formData.get("email"),
    password: formData.get("password"),
    full_name: formData.get("fullname"),
  };
  const {
    data: { user },
    error,
  } = await supabase.auth?.signUp(newUserData);

  if (!error) {
    await supabase.from("profiles").insert([
      {
        id: user?.id,
        full_name: newUserData.full_name,
        email: newUserData.email,
        role: "user",
      },
    ]);
  } else {
    return { error: error.message };
  }
  redirect("/");
}
