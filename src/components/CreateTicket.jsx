"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef } from "react";
import { TicketPlus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { createTicket } from "@/lib/action";
import SubmitButton from "./ui/SubmitButton";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const CreateTicket = () => {
  const [state, formAction] = useFormState(createTicket, { status: null });
  const formRef = useRef();
  const { toast } = useToast();
  const router = useRouter();
  const ticketSchema = z.object({
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    desc: z.string(),
    priority: z.string(),
    category: z.string(),
  });

  const ticketForm = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      desc: "",
      priority: undefined,
      category: undefined,
    },
  });

  useEffect(() => {
    if (state.status === "success") {
      toast({
        variant: "success",
        description: "Ticket is created successfully!",
      });
      router.refresh();
    }
  }, [toast, state, router]);

  return (
    <div>
      <Popover>
        <PopoverTrigger
          className={cn(
            "flex  items-center justify-center [&>span]:items-center [&_svg]:items-center"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <TicketPlus />
            </TooltipTrigger>

            <TooltipContent>
              <p>Create a ticket</p>
            </TooltipContent>
          </Tooltip>
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Create new ticket</CardTitle>
            </CardHeader>

            <Form {...ticketForm}>
              <form action={formAction} className="space-y-8 flex flex-col">
                <FormField
                  control={ticketForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={ticketForm.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={ticketForm.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          name="priority"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                className="text-black"
                                placeholder="Select priority"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Not urgent</SelectItem>

                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={ticketForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          name="category"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                className="text-black"
                                placeholder="Select category"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hardware">Hardware</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <SubmitButton text="Submit" />
              </form>
            </Form>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateTicket;
