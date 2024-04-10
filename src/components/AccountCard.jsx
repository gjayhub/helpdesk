"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const accountSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
});

const AccountCard = () => {
  const accountForm = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });
  function onAccountSubmit(values) {
    console.log(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          You can make changes in your username and email here
        </CardDescription>
      </CardHeader>

      <Form {...accountForm}>
        <form
          onSubmit={accountForm.handleSubmit(onAccountSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormField
            control={accountForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={accountForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 
          <Button className={cn("text-center")} type="submit">
            Submit
          </Button> */}
        </form>
      </Form>
    </Card>
  );
};

export default AccountCard;
