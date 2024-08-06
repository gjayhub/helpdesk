import React from "react";
import { allTicket } from "./action";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportList from "../(components)/ReportList";
import ReportTickets from "../(components)/ReportTickets";
import Header from "./Header";

const Report = async () => {
  const tickets = await allTicket();
  return (
    <div className="mt-10">
      <Header />
      <Tabs defaultValue="counts" className="min-h-screen">
        <TabsList className="flex justify-center">
          <TabsTrigger className="w-full" value="counts">
            Ticket Counts
          </TabsTrigger>
          <TabsTrigger className="w-full" value="tickets">
            Tickets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="counts">
          <ReportList tickets={tickets} />
        </TabsContent>
        <TabsContent value="tickets">
          <ReportTickets tickets={tickets} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Report;
