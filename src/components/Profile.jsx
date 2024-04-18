"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AccountCard from "./AccountCard";
import PasswordCard from "./PasswordCard";

const Profile = ({ isCollapsed, profile }) => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex gap-2 justify-center items-center [&>span]:items-center ",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&_p]:hidden"
        )}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{profile?.full_name}</p>
      </PopoverTrigger>
      <PopoverContent>
        <AccountCard profile={profile} />

        <PasswordCard />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
