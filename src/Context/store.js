"use client";

import useSWR from "swr";
import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, getTickets } from "@/lib/action";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";

const layout = getCookie("react-resizable-panels:layout");

const GlobalContext = createContext({
  profile: null,
});
const fetcher = (url) => fetch(url).then((res) => res.json());
export const GlobalContextProvider = ({ children }) => {
  // const { data: ticketsData } = useSWR("getTickets", getTickets);
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get("filter");
  const query = searchParams.get("query");
  const id = searchParams.get("id");
  const day = searchParams.get("day");
  const ticketId = searchParams.get("ticketId");

  const searchFilter = {
    filter,
    query,
    id,
    day,
    ticketId,
  };
  const { defaultLayout, setDefaultLayout } = useState([25, 35, 45]);

  const [tickets, setTickets] = useState([]);
  const { data: counts } = useSWR(
    ["http://localhost:3000/api/Tickets/Counts"],
    fetcher,
    { refreshInterval: 10 }
  );
  const { data: ticketsData, isLoading } = useSWR(
    "http://localhost:3000/api/Tickets",
    fetcher,
    { refreshInterval: 10 }
  );

  return (
    <GlobalContext.Provider
      value={{
        // profile,
        isLoading,
        counts,
        defaultLayout,
        ticketsData,
        tickets,
        setTickets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
