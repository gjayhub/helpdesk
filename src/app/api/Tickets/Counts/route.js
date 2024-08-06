import { getProfile } from "@/lib/action";
import { createClient } from "@/utils/supabase/server";
// import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const profile = await getProfile();
  let filter = {};
  if (profile.role === "user") {
    filter.sender_id = profile.id;
  }
  try {
    const promises = [
      supabase
        .from("tickets")
        .select(`"*",profiles("full_name")`, { count: "exact", head: true })
        .eq("status", "new")
        .match(filter)
        .then(({ count }) => count),

      supabase
        .from("tickets")
        .select(`"*",profiles("full_name")`, { count: "exact", head: true })
        .eq("status", "ongoing")
        .match(filter)
        .then(({ count }) => count),

      supabase
        .from("tickets")
        .select(`"*",profiles("full_name")`, { count: "exact", head: true })
        .eq("status", "resolved")
        .match(filter)
        .then(({ count }) => count),

      supabase
        .from("tickets")
        .select(`"*",profiles("full_name")`, { count: "exact", head: true })
        .eq("priority", "urgent")
        .match(filter)
        .then(({ count }) => count),

      supabase
        .from("tickets")
        .select(`"*",profiles("full_name")`, { count: "exact", head: true })
        .match(filter)
        .then(({ count }) => count),

      supabase
        .from("tickets")
        .select(`"*",profiles("full_name")`, { count: "exact", head: true })
        .eq("is_public", true)

        .then(({ count }) => count),
    ];

    // Wait for all promises to resolve
    const [
      newTickets,
      ongoingTickets,
      resolvedTickets,
      urgentTickets,
      total,
      publicTickets,
    ] = await Promise.all(promises);

    return NextResponse.json(
      {
        newTickets,
        ongoingTickets,
        resolvedTickets,
        urgentTickets,
        total,
        publicTickets,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
