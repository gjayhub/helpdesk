"use client";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Clock7,
  Combine,
  Loader,
  CircleCheckBig,
  CircleAlert,
  Users,
} from "lucide-react";
import { useGlobalContext } from "@/Context/store";

const NavItem = () => {
  const searchParams = useSearchParams();
  // const [ticketCounts, setTicketCounts] = useState(counts)

  const { counts } = useGlobalContext();
  const params = new URLSearchParams(searchParams);

  params.delete("query");
  params.delete("id");
  params.delete("day");
  const { replace } = useRouter();
  const isRootPath = usePathname() === "/home";

  const navItems = [
    { label: "All", icon: <Combine />, filter: "", count: counts?.total },
    {
      label: "New",
      icon: <Clock7 />,
      filter: "new",
      count: counts?.newTickets,
      color: "text-green-500",
    },
    {
      label: "On going",
      icon: <Loader />,
      filter: "ongoing",
      count: counts?.ongoingTickets,
      color: "text-red-500",
    },
    {
      label: "Resolved",
      icon: <CircleCheckBig />,
      filter: "resolved",
      count: counts?.resolvedTickets,
      color: "text-green-500",
    },
    {
      label: "Urgent",
      icon: <CircleAlert />,
      filter: "urgent",
      count: counts?.urgentTickets,
      color: "text-blue-500",
    },
    {
      label: "Public",
      icon: <Users />,
      filter: "public",
      count: counts?.publicTickets,
      color: "text-blue-500",
    },
  ];

  const handleNav = (filter) => {
    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    replace(`/home/?${params.toString()}`);
  };
  return (
    <div>
      {navItems.map((item, index) => (
        <div
          key={index}
          onClick={() => handleNav(item.filter)}
          className={cn(
            "w-fit  px-1 rounded-md",
            (searchParams.get("filter") === item.filter ||
              (item.filter === "" && !searchParams.get("filter"))) &&
              isRootPath
              ? "bg-slate-200"
              : ""
          )}
        >
          <Tooltip>
            <TooltipTrigger className="relative">
              {item.icon}
              <p>{item.label}</p>
              <p className={`text-slate-500 text-xs absolute p-1 top-0 `}>
                {item.count}
              </p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>{`List of all ${item.label.toLowerCase()} tickets`}</span>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
export default NavItem;
