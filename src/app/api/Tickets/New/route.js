import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select(`"*",profiles("*"), responses("*")`)
      .eq("status", "new")
      .range(0, 10)
      .order("created_at", {
        ascending: false,
      });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
