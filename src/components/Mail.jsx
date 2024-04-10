"use client";

import React, { Suspense, useState, useEffect } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";
import Tab from "./Profile";
import Profile from "./Profile";
import Nav from "./Nav";
import TicketList from "./TicketList";
import SingleTicket from "./SingleTicket";
import CreateTicket from "./CreateTicket";
import { getTickets } from "@/lib/action";
import SearchBox from "./SearchBox";

const Mail = ({
  defaultLayout = [20, 35, 45],
  defaultCollapsed,
  navCollapsedSize,
  initialTickets,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [tickets, setTickets] = useState(initialTickets);
  const [selected, setSelected] = useState();

  return (
    <TooltipProvider>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <Suspense fallback={<p>Loading</p>}>
              <Profile isCollapsed={isCollapsed} />
            </Suspense>
          </div>
          <Separator />
          <div>
            <Nav isCollapsed={isCollapsed} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex justify-between px-4 py-3">
            <h1 className="text-xl font-bold">Tickets</h1>

            <CreateTicket />
          </div>
          <Separator />
          <SearchBox />
          <div>
            <TicketList
              tickets={tickets}
              setTickets={setTickets}
              setSelected={setSelected}
              selected={selected}
            />
          </div>
        </ResizablePanel>
        {/* <ResizableHandle withHandle />

        <ResizablePanel minSize={25} defaultSize={defaultLayout[2]}>
          {selected && (
            <SingleTicket ticket={selected} setTicket={setSelected} />
          )}
        </ResizablePanel> */}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Mail;
