"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { updateProfile } from "@/lib/action";
import SubmitButton from "./ui/SubmitButton";
import { useFormState } from "react-dom";
import { toast } from "./ui/use-toast";
const AccountCard = ({ profile }) => {
  const [state, formAction] = useFormState(updateProfile, { status: null });
  useEffect(() => {
    if (state.status === "success") {
      toast({
        variant: "success",
        description: "Account is updated successfully!",
      });
    }
  }, [state]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          You can make changes in your username and email here
        </CardDescription>
      </CardHeader>

      <form
        action={formAction}
        className="space-y-8  flex flex-col [&_input]:px-2"
      >
        <input name="fullname" placeholder={`${profile?.full_name}`} />

        <input type="email" name="email" placeholder={profile?.email} />

        <SubmitButton text="Submit" />
      </form>
    </Card>
  );
};

export default AccountCard;
