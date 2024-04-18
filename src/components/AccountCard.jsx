"use client";
import React, { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { updateProfile } from "@/lib/action";
import { Loader } from "lucide-react";
import SubmitButton from "./ui/SubmitButton";
const AccountCard = ({ profile }) => {
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          You can make changes in your username and email here
        </CardDescription>
      </CardHeader>

      <form action={updateProfile} className="space-y-8 flex flex-col">
        <input name="fullname" placeholder={`${profile?.full_name}`} />

        <input type="email" name="email" placeholder={profile?.email} />

        <SubmitButton text="Submit" />
      </form>
    </Card>
  );
};

export default AccountCard;
