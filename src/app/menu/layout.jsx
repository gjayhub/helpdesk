import { getProfile } from "@/lib/action";
import React from "react";
import MenuComponent from "./(component)/MenuComponent";
import { TooltipProvider } from "@/components/ui/tooltip";
export const revalidate = 3600;

const layout = async ({ children }) => {
  const user = await getProfile();

  return (
    <section>
      <TooltipProvider>
        <MenuComponent profile={user}>{children}</MenuComponent>
      </TooltipProvider>
    </section>
  );
};

export default layout;
