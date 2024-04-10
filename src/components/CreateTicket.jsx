import React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TicketPlus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { createTicket } from "@/lib/action";

const CreateTicket = () => {
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
  function onTicketSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger
          className={cn("flex gap-2 items-center [&>span]:items-center ")}
        >
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <TicketPlus />
              </TooltipTrigger>

              <TooltipContent>
                <p>Create a ticket</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Create new ticket</CardTitle>
            </CardHeader>

            <Form {...ticketForm}>
              <form action={createTicket} className="space-y-8 flex flex-col">
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
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
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

                <Button className={cn("text-center")} type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateTicket;
