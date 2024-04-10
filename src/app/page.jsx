import Mail from "@/components/Mail";
import Profile from "@/components/Profile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import { getTickets } from "@/lib/action";

export default async function Home({ searchParams }) {
  const supabase = createClient();

  const initialTicket = await getTickets(searchParams);

  const { data, error } = await supabase.auth?.getUser();
  if (error || !data?.user) {
    redirect("/Login");
  }
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
        />
      </div>
    </main>
  );
}
