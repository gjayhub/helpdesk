"use client";
import React, { Suspense, useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import TicketList from "./TicketList";
import SingleTicket from "./SingleTicket";
import CreateTicket from "./CreateTicket";
import SearchBox from "./SearchBox";
import { TicketIcon, X } from "lucide-react";
import AgencyTabs from "./AgencyTabs";

const Mail = ({ initialTickets, profile, defaultLayout = [40, 60] }) => {
  const [tickets, setTickets] = useState(initialTickets);
  const [selected, setSelected] = useState();

  return (
    <div className="relative h-full">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={40}>
          <div className=" flex justify-between px-4 py-3">
            <div className="md:hidden"></div>
            <p className="text-xl text-center font-bold ">Tickets</p>

            <CreateTicket />
          </div>
          <Separator />

          <SearchBox />
          <div className="flex justify-center">
            <AgencyTabs />
          </div>
          <div>
            <TicketList
              tickets={tickets}
              setTickets={setTickets}
              setSelected={setSelected}
              selected={selected}
              initialTickets={initialTickets}
              profile={profile}
            />
          </div>
        </ResizablePanel>
        {selected && (
          <div
            className={`sm:hidden fixed inset-0 flex justify-center items-center bg-black bg-opacity-50  transition-all duration-800 
             
            `}
          >
            <div className="w-3/4 max-w-md p-2 bg-white max-h-[90%] overflow-y-auto overflow-x-hidden rounded-lg relative ">
              <X
                className="absolute top-0 right-0 cursor-pointer "
                onClick={() => setSelected(null)}
              />
              <div className="m-2">
                <SingleTicket
                  selected={selected}
                  setSelected={setSelected}
                  profile={profile}
                  setTickets={setTickets}
                  tickets={tickets}
                />
              </div>
            </div>
          </div>
        )}
        <ResizableHandle className="max-sm:hidden" withHandle />
        <ResizablePanel
          className="max-sm:hidden"
          minSize={40}
          defaultSize={defaultLayout[1]}
        >
          {selected ? (
            <SingleTicket
              selected={selected}
              setSelected={setSelected}
              profile={profile}
              setTickets={setTickets}
              tickets={tickets}
            />
          ) : (
            <div className="flex flex-col h-screen [&_p]:text-2xl font-semibold justify-center items-center">
              <div className="animate-bounce">
                <TicketIcon size={200} />
              </div>

              <p>Select a ticket</p>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Mail;
