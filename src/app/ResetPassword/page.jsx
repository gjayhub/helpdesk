"use client";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import Link from "next/link";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    const supabase = createClient();
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setErrors({ somethingWentWrong: error.message });
      }
      if (user) {
        console.log(user);
        {
          toast({
            title: "Password updated succesfully",
          });
        }
        await supabase.auth.signOut();
        setLoading(false);
        setSuccess(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "" });
    }
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Card className="p-10">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <form
            className="space-y-8 flex flex-col [&_input]:p-2 "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="New password"
              value={password}
              onChange={handleChangePassword}
            />
            {errors.password && (
              <span className="text-sm text-red-400">{errors.password}</span>
            )}

            <input
              type="text"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-400">
                {errors.confirmPassword}
              </span>
            )}
            {errors.somethingWentWrong && (
              <span className="text-sm text-red-400">
                {errors.somethingWentWrong}
              </span>
            )}
            {success && (
              <span className="px-2 bg-green-100 text-green-600">
                Successfully changed password. Click{" "}
                <Link className="underline" href={"/Login"}>
                  here
                </Link>{" "}
                to login
              </span>
            )}

            <Button className={cn("text-center")} type="submit">
              {loading ? "Reseting..." : "Submit"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
