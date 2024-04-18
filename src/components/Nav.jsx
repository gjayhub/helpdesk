"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Clock7,
  Combine,
  Loader,
  CircleCheckBig,
  CircleAlert,
  BarChart3,
  UserCog,
  FileAxis3D,
  FileAxis3d,
} from "lucide-react";
import { Separator } from "./ui/separator";
import LogoutUser from "./Logout";
import NavLinks from "./NavLinks";

const Nav = ({ isCollapsed, profile }) => {
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("filter");
  const { replace, refresh } = useRouter();
  const handleNav = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("id");
    params.delete("day");
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
          <Tooltip>
            <TooltipTrigger>
              <Combine />
              <p>All</p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>List of all tickets</span>
            </TooltipContent>
          </Tooltip>
        </div>

        <div onClick={() => handleNav("new")}>
          <Tooltip>
            <TooltipTrigger>
              <Clock7 />
              <p>New</p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>List of all new tickets</span>
            </TooltipContent>
          </Tooltip>
        </div>
        <div onClick={() => handleNav("ongoing")}>
          <Tooltip>
            <TooltipTrigger>
              <Loader />
              <p>On going</p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>List of all ongoing tickets</span>
            </TooltipContent>
          </Tooltip>
        </div>
        <div onClick={() => handleNav("resolved")}>
          <Tooltip>
            <TooltipTrigger>
              <CircleCheckBig />
              <p>Resolved</p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>List of all resolved tickets</span>
            </TooltipContent>
          </Tooltip>
        </div>
        <div onClick={() => handleNav("urgent")}>
          <Tooltip>
            <TooltipTrigger>
              <CircleAlert />
              <p>Urgent</p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>List of all urgent tickets</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <Separator />
      <div
        className={cn(
          "flex flex-col mt-5 [&_p]:inline [&_svg]:inline pl-4 [&_svg]:pr-2",
          isCollapsed && " text-center [&_p]:hidden "
        )}
      >
        <>
          {profile?.role === "admin" && (
            <>
              <div>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/menu/Overview">
                      <BarChart3 />
                      <p>Overview</p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <span>Tickets statistics and charts</span>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/menu/ManageUsers">
                      <UserCog />
                      <p>Manage Users</p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <span>Manage users and their own ticket</span>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/menu/Report">
                      <FileAxis3d />
                      <p>Report</p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <span>Download ticket reports</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </>
          )}
          <LogoutUser />
        </>
      </div>
    </>
  );
};

export default Nav;
