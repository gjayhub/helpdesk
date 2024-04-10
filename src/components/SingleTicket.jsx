import React, { useState, useEffect } from "react";
import { Tooltip, TooltipTrigger } from "./ui/tooltip";
import { Send, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import moment from "moment";
import { sendReply } from "@/lib/action";
import "moment-timezone";
import { createClient } from "@/utils/supabase/client";

const SingleTicket = ({ ticket, setTicket }) => {
  const sendReplyTicket = sendReply.bind(null, ticket.ticket_id);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const channels = supabase
      .channel("realtime_replies")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "responses" },
        (payload) => {
          setTicket({
            ...ticket,
            responses: [...ticket.responses, payload.new],
          });
          console.log(ticket.responses);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase, ticket]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-4 gap-3">
        <div className="flex items-center ">
          <Tooltip>
            <TooltipTrigger>
              <Trash2 className="h-4 w-4" />
            </TooltipTrigger>
          </Tooltip>
        </div>
        <Separator orientation="vertical" />

        <div className="flex items-center justify-around [&_input]:mt-1 w-full">
          <p className="p-0 m-0 font-semibold text-sm text-nowrap">
            {ticket.status}
          </p>
          <input type="range" min={0} max={100} />
        </div>

        <Separator orientation="vertical" />
        <Tooltip>
          <TooltipTrigger>
            <Send className="h-4 w-4" />
          </TooltipTrigger>
        </Tooltip>
      </div>
      <Separator />
      {ticket ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt="Namae" />
                <AvatarFallback>
                  {ticket.profiles.full_name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{ticket.profiles.full_name}</div>
                <div className="line-clamp-1 text-xs">{ticket.title}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span>{" "}
                  {ticket.profiles.email}
                </div>
              </div>
            </div>

            <div className="ml-auto text-xs text-muted-foreground">
              {moment(ticket.created_at).calendar()}
            </div>
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {ticket.description}
          </div>
          <Separator className="mt-auto" />

          <div className="p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Replies</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className="h-60 relative flex ">
                    {ticket.responses.map((response) => {
                      return (
                        <div
                          key={response.id}
                          className="bg-slate-100 mr-20 p-2 w-full rounded-sm mb-5"
                        >
                          <p className="font-semibold ">
                            {ticket.profiles.full_name}
                          </p>

                          <p className="py-1">{response.response_text}</p>
                          <p className="text-xs text-slate-400">
                            {moment(response.created_at).calendar()}
                          </p>
                        </div>
                      );
                    })}
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <form action={sendReplyTicket}>
              <div className="grid gap-4">
                <Textarea
                  name="reply"
                  className="p-4"
                  placeholder={`Reply ${ticket.profiles.full_name}...`}
                />
                <div className="flex items-center">
                  <Button type="submit" size="sm" className="ml-auto">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
};

export default SingleTicket;
