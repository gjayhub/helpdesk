import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Clock7,
  Combine,
  Loader,
  CircleCheckBig,
  CircleAlert,
  BarChart3,
  UserCog,
  FileAxis3D,
} from "lucide-react";
import { Separator } from "./ui/separator";
import LogoutUser from "./Logout";

const Nav = ({ isCollapsed }) => {
  const searchParams = useSearchParams();

  const { replace, refresh } = useRouter();

  const handleNav = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    replace(`/?${params.toString()}`);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col my-5 [&_p]:inline [&_svg]:inline pl-4 [&_svg]:pr-2 [&_div]:cursor-pointer",
          isCollapsed && " text-center [&_p]:hidden"
        )}
      >
        <div onClick={() => handleNav()}>
          <Combine />
          <p>All</p>
        </div>

        <div onClick={() => handleNav("new")}>
          <Clock7 />
          <p>New</p>
        </div>
        <div onClick={() => handleNav("ongoing")}>
          <Loader />
          <p>On going</p>
        </div>
        <div onClick={() => handleNav("resolved")}>
          <CircleCheckBig />
          <p>Resolved</p>
        </div>
        <div onClick={() => handleNav("urgent")}>
          <CircleAlert />
          <p>Urgent</p>
        </div>
      </div>
      <Separator />
      <div
        className={cn(
          "flex flex-col mt-5 [&_p]:inline [&_svg]:inline pl-4 [&_svg]:pr-2",
          isCollapsed && " text-center [&_p]:hidden"
        )}
      >
        <Link href="">
          <BarChart3 />
          <p>Overview</p>
        </Link>
        <Link href="/ManageUsers">
          <UserCog />
          <p>Manage Users</p>
        </Link>
        <Link href="">
          <FileAxis3D />
          <p>Report</p>
        </Link>
        <LogoutUser />
      </div>
    </>
  );
};

export default Nav;
