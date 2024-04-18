import React from "react";
import { allTicket } from "./action";
import ReportList from "../(component)/ui/ReportList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportTickets from "../(component)/ui/ReportTickets";

export const revalidate = 3600;

const Report = async () => {
  const tickets = await allTicket();
  return (
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
  );
};

export default Report;
