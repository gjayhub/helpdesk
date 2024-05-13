"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

const AdminNavItem = ({ item }) => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "w-fit px-1 rounded-md",
        pathname === item.href ? "bg-slate-200" : ""
      )}
    >
      <Tooltip>
        <TooltipTrigger>
          <Link href={item.href}>
            {item.icon}
            <p>{item.label}</p>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>{item.tooltip}</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AdminNavItem;
