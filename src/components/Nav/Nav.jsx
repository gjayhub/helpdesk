import { cn } from "@/lib/utils";
import { BarChart3, UserCog, FileAxis3D } from "lucide-react";
import { Separator } from "../ui/separator";
import LogoutUser from "../Logout";

import AdminNavItem from "./AdminNavItems";
import NavItem from "./NavItems";
import { getProfile } from "@/lib/action";
import { Suspense } from "react";
import Profile from "../Profile";

const Nav = async () => {
  const profile = await getProfile();
  const adminItems = [
    {
      label: "Manage Users",
      icon: <UserCog />,
      href: "/home/menu/manage-users",
      tooltip: "Manage users and their own ticket",
    },
    {
      label: "Report",
      icon: <FileAxis3D />,
      href: "/home/menu/report",
      tooltip: "Download ticket reports",
    },
  ];

  return (
    <div>
      <div className={cn("flex h-[52px] pl-4")}>
        <Suspense fallback={<p>Loading</p>}>
          <Profile profile={profile} />
        </Suspense>
      </div>
      <Separator />
      <div
        className={cn(
          "flex flex-col gap-5 my-5 [&_p]:inline [&_svg]:inline pl-4 [&_svg]:pr-2 [&_div]:cursor-pointer"
        )}
      >
        <NavItem counts={{}} />

        <Separator />
        <div>
          {profile?.role === "admin" &&
            adminItems.map((item, index) => (
              <AdminNavItem key={index} item={item} />
            ))}
          <LogoutUser />
        </div>
      </div>
    </div>
  );
};

export default Nav;
