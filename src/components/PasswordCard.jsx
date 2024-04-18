"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { useFormState } from "react-dom";
import { sendResetPasswordReq } from "@/lib/action";
import { useToast } from "./ui/use-toast";
import { createClient } from "@/utils/supabase/client";
const initialState = {
  message: "",
  error: "",
};

const PasswordCard = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState();

  const sendResetPassword = async (e) => {
    e.preventDefault();

    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/ResetPassword",
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-center">Reset password</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            Enter your email to send a password reset request
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={sendResetPassword}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="enter your email address"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {success && (
              <p className="px-2 rounded bg-green-100 text-green-600">
                Password reset request has been sent. Check your email to reset
                your password
              </p>
            )}
            <Button type="submit">Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordCard;
