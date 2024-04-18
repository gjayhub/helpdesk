import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("tickets")
      .select(`"*",profiles("full_name")`);
    console.log(data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
