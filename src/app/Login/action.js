"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth?.signInWithPassword(data);

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData) {
  const supabase = createClient();

  const newUserData = {
    email: formData.get("email"),
    password: formData.get("password"),
    full_name: formData.get("fullname"),
  };

  const {
    data: { user },
  } = await supabase.auth?.signUp(newUserData);

  const { error } = await supabase.from("profiles").insert([
    {
      id: user.id,
      full_name: newUserData.full_name,
      email: newUserData.email,
      role: "user",
    },
  ]);
  revalidatePath("/", "layout");
  redirect("/");
}
