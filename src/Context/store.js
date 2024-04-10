"use client";

import useSWR from "swr";
import { createContext, useContext, useState } from "react";
import { getTickets } from "@/lib/action";

const GlobalContext = createContext({
  tickets: [],
  setTickets: () => [],
});

export const GlobalContextProvider = ({ children }) => {
  const { data, isLoading } = useSWR("getTickets", getTickets);
  const [tickets, setTickets] = useState(data.tickets);
};
