import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";
import { getTickets } from "@/lib/action";
import { useInView } from "react-intersection-observer";
import moment from "moment";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useGlobalContext } from "@/Context/store";
import { createClient } from "@/utils/supabase/client";
import { toast } from "./ui/use-toast";

function getStatus(status) {
  if (status === "new") {
    return "bg-red-400";
  }

  if (status === "ongoing") {
    return "bg-yellow-400";
  }

  return "bg-green-400";
}

const TicketList = ({
  tickets,
  setTickets,
  setSelected,
  selected,
  initialTickets,
  profile,
}) => {
  const [offset, setOffset] = useState(2);
  const { ref, inView } = useInView();
  const [noMoreTicket, setNoMoreTicket] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setTicketsCount } = useGlobalContext();
  const filter = searchParams.get("filter");
  const query = searchParams.get("query");
  const id = searchParams.get("id");
  const day = searchParams.get("day");
  const ticketId = searchParams.get("ticketId");
  const supabase = createClient();

  useEffect(() => {
    if (inView && !noMoreTicket) {
      const loadMoreTickets = async () => {
        setIsLoading(true);
        setNoMoreTicket(false);
        const searchFilter = {
          page: offset,
          filter,
          query,
          id,
          day,
          ticketId,
        };
        const moreTickets = await getTickets(searchFilter);
        if (moreTickets.length !== 0) {
          setOffset((prev) => prev + 1);
          setTickets([...tickets, ...moreTickets]);
          setIsLoading(false);
        } else {
          setNoMoreTicket(true);
          setIsLoading(false);
        }
      };

      loadMoreTickets();
    }
  }, [
    day,
    filter,
    id,
    inView,
    initialTickets,
    noMoreTicket,
    offset,
    query,
    setTickets,
    ticketId,
    tickets,
  ]);

  useEffect(() => {
    const checkPayload = (payload) => {
      setTickets((prev) => {
        const index = prev.findIndex(
          (item) => item.ticket_id === payload.new.ticket_id
        );

        if (index !== -1) {
          const updatedTicket = [...new Set(prev)];
          updatedTicket[index] = prev[index] = {
            ...prev[index],
            status: payload.new.status,
            progress: payload.new.progress,
            is_updated: payload.new.is_updated,
          };
          if (selected?.ticket_id === updatedTicket[index].ticket_id) {
            setSelected(updatedTicket[index]);
          }
          return updatedTicket;
        }
        return updatedTicket;
      });
    };
    const channels = supabase
      .channel("realtime_tickets")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tickets" },
        async (payload) => {
          if (payload.eventType === "UPDATE") {
            checkPayload(payload);
            return;
          }
          if (payload.eventType === "DELETE") {
            return;
          }

          const search = [];
          for (const value of searchParams.values()) {
            search.push(value);
          }
          const matchesSearchParams = () => {
            if (!searchParams) return true; // If no searchParams, all tickets match

            return (
              !search.length ||
              ["status", "priority"].some((field) =>
                search.includes(payload.new[field])
              )
            );
          };

          if (matchesSearchParams()) {
            const { data: profiles, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", payload.new.sender_id)
              .single();
            const newTicket = { ...payload.new, profiles, responses: [] };
            setTickets((prevTickets) => [newTicket, ...prevTickets]);
            if (profile.role == "admin") {
              toast({
                title: "New ticket is submitted",
                description: `New ticket is submitted by ${profiles.full_name}`,
              });
            }
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channels);
    };
  }, [
    tickets,
    setTickets,
    supabase,
    initialTickets,
    searchParams,
    selected,
    setSelected,
    profile.role,
  ]);

  const handleNewUpdates = async (ticket) => {
    if (ticket.is_updated && profile.role !== "admin") {
      const { data, error } = await supabase
        .from("tickets")
        .update({ is_updated: false })
        .eq("ticket_id", ticket.ticket_id)
        .select();
      console.log("triggered");
    }
  };
  const filtered = [...new Set(tickets)];

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {filtered.map((ticket) => {
          return (
            <div
              key={ticket.ticket_id}
              className={cn(
                "flex flex-col cursor-pointer relative items-start gap-2 rounded-lg border bg-inherit p-3 text-black text-left text-sm transition-all hover:bg-slate-300",
                selected?.ticket_id === ticket.ticket_id && "bg-slate-200"
              )}
              onClick={() => {
                handleNewUpdates(ticket);
                setSelected(ticket);
              }}
            >
              {ticket.status === "resolved" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-10 rotate-12">
                    Resolved
                  </span>
                </div>
              )}
              {ticket.is_updated && (
                <div className="absolute px-1 right-1 top-1 bg-black animate-bounce rounded-md text-xs text-white">
                  New updates
                </div>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "h-2 w-2  absolute right-1 bottom-1 rounded-full",
                      getStatus(ticket.status)
                    )}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize">{ticket.status}</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex w-full justify-between items-center">
                <p className="font-semibold text-base">
                  {ticket.profiles?.full_name}
                </p>
                <p className="text-xs font-light">
                  {moment(ticket.created_at).calendar()}
                </p>
              </div>
              <div className="">
                <p className="line-clamp-2 font-semibold text-sm">
                  {ticket.title.substring(0, 300)}
                </p>
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {ticket.description?.substring(0, 300)}
                </span>
              </div>
            </div>
          );
        })}
        <div
          ref={ref}
          className="font-light text-center italic [&_svg]:mx-auto"
        >
          {noMoreTicket && <p>End of the list</p>}
          {isLoading && <Loader className="animate-spin" />}
        </div>
      </div>
    </ScrollArea>
  );
};

export default TicketList;
