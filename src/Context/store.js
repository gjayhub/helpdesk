"use client";

import useSWR from "swr";
import { createContext, useContext, useState } from "react";
import { getProfile, getTickets } from "@/lib/action";
import { getCookie } from "cookies-next";

const layout = getCookie("react-resizable-panels:layout");

const GlobalContext = createContext({
  profile: null,
});
const fetcher = (url) => fetch(url).then((res) => res.json());
export const GlobalContextProvider = ({ children }) => {
  const { data: ticketsData } = useSWR("getTickets", getTickets);
  const { defaultLayout, setDefaultLayout } = useState([25, 35, 45]);

  const [tickets, setTickets] = useState(ticketsData);
  const { data: counts } = useSWR(
    "http://localhost:3000/api/Tickets/Counts",
    fetcher,
    { refreshInterval: 1000 }
  );

  return (
    <GlobalContext.Provider
      value={{
        // profile,
        counts,
        defaultLayout,

        setTickets,
        tickets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
