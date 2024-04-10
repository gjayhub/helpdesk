import React, { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Tickets } from "@/Data/Tickets";
import { Button } from "./ui/button";
import { getTickets } from "@/lib/action";
import { useInView } from "react-intersection-observer";
import moment from "moment";

function getBadgeVariantFromLabel(label) {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

const TicketList = ({ tickets, setTickets, setSelected, selected }) => {
  const [offset, setOffset] = useState(2);
  const { ref, inView } = useInView();
  const [noMoreTicket, setNoMoreTicket] = useState(false);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const filter = searchParams.get("filter");
  const query = searchParams.get("query");

  useEffect(() => {
    if (inView && !noMoreTicket) {
      const loadMoreTickets = async () => {
        setIsLoading(true);
        setNoMoreTicket(false);
        const searchFilter = { page: offset, filter, query };
        const moreTickets = await getTickets(searchFilter);

        if (moreTickets.length !== 0) {
          setTickets([...tickets, ...moreTickets]);
          setOffset((prev) => prev + 1);
          setIsLoading(false);
        } else {
          setNoMoreTicket(true);
          setIsLoading(false);
        }
      };

      loadMoreTickets();
    }
  }, [inView]);

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {tickets.map((ticket) => {
          return (
            <button
              key={ticket.ticket_id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg  border bg-inherit p-3 text-black text-left text-sm transition-all hover:bg-slate-300",
                selected?.ticket_id === ticket.ticket_id && "bg-slate-200"
              )}
              onClick={() => setSelected(ticket)}
            >
              <div className="flex w-full justify-between items-center">
                <p className="font-semibold text-base">
                  {ticket.profiles.full_name}
                </p>
                <p className="text-xs font-light">
                  {moment(ticket.created_at).calendar()}
                </p>
              </div>
              <div className="">
                <p className="font-semibold text-sm">{ticket.title}</p>
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {ticket.description.substring(0, 300)}
                </span>
              </div>
            </button>
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
