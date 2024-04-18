import Mail from "@/components/Mail";
import Profile from "@/components/Profile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getProfile, getTickets } from "@/lib/action";

export const revalidate = 3600;

export default async function Home({ searchParams }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth?.getUser();
  if (error || !data?.user) {
    redirect("/Login");
  }
  const initialTicket = await getTickets(searchParams);
  const user = await getProfile();

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  let defaultCollapsed = null;
  if (collapsed?.value === undefined) {
    defaultCollapsed = false;
  } else {
    defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  }
  return (
    <main>
      <div>
        <Mail
          key={Math.random()}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
          initialTickets={initialTicket}
          profile={user}
        />
      </div>
    </main>
  );
}
