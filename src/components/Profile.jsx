"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AccountCard from "./AccountCard";
import PasswordCard from "./PasswordCard";
import { createClient } from "@/utils/supabase/client";

const Profile = ({ isCollapsed }) => {
  // useEffect(() => {
  //   const getUser = async () => {
  //     const supabase = createClient();
  //     const { data, error } = await supabase.auth?.getUser();
  //     console.log(data.user);
  //   };
  //   getUser();
  // }, []);

  return (
    <Popover>
      <PopoverTrigger
        className={cn("flex gap-2 items-center [&>span]:items-center ")}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className={cn(isCollapsed && "hidden")}>Admin</span>
      </PopoverTrigger>
      <PopoverContent>
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountCard />
          </TabsContent>
          <TabsContent value="password">
            <PasswordCard />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
