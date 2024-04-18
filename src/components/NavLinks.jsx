import { BarChart3, FileAxis3d, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoutUser from "./Logout";
import { cn } from "@/lib/utils";
import { getProfile } from "@/lib/action";

// const getProfile = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/Profile", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch profile");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };

const NavLinks = async () => {
  const profile = await getProfile();
  // const profile = {};

  return (
    <>
      {profile?.role === "admin" && (
        <>
          <Link href="">
            <BarChart3 />
            <p>Overview</p>
          </Link>
          <Link href="/menu/ManageUsers">
            <UserCog />
            <p>Manage Users</p>
          </Link>
          <Link href="/menu/Report">
            <FileAxis3d />
            <p>Report</p>
          </Link>
        </>
      )}
      <LogoutUser />
    </>
  );
};

export default NavLinks;
