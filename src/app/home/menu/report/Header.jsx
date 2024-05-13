"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGlobalContext } from "@/Context/store";
import { LineChart } from "lucide-react";

const Header = () => {
  const { counts } = useGlobalContext();
  return (
    <div className="flex [&_div]:w-44 [&_div]:h-20 justify-around  flex-wrap [&_p]:text-lg my-5">
      <Card className="flex pt-2">
        <div>
          <LineChart color="blue" size={60} />
        </div>
        <div>
          <CardTitle className="text-lg">Total</CardTitle>
          <CardDescription className="">{counts?.total}</CardDescription>
        </div>
      </Card>
      <Card className="flex pt-2">
        <div>
          <LineChart color="red" size={60} />
        </div>
        <div>
          <CardTitle className="text-lg">New</CardTitle>
          <CardDescription className="">{counts?.newTickets}</CardDescription>
        </div>
      </Card>
      <Card className="flex  pt-2">
        <div>
          <LineChart color="orange" size={60} />
        </div>
        <div>
          <CardTitle className="text-lg">Ongoing</CardTitle>
          <CardDescription className="">
            {counts?.ongoingTickets}
          </CardDescription>
        </div>
      </Card>
      <Card className="flex  pt-2">
        <div>
          <LineChart color="green" size={60} />
        </div>
        <div>
          <CardTitle className="text-lg">Resolved</CardTitle>
          <CardDescription className="">
            {counts?.resolvedTickets}
          </CardDescription>
        </div>
      </Card>
    </div>
  );
};

export default Header;
