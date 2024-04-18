"use client";

import useSWR from "swr";
import { createContext, useContext, useState } from "react";
import { getProfile, getTickets } from "@/lib/action";

const GlobalContext = createContext({
  collapse: null,
  profile: null,
});

export const GlobalContextProvider = ({ children }) => {
  const { data: ticketsData } = useSWR("getTickets", getTickets);
  // const { data: profile, isLoading } = useSWR("getProfile", getProfile);
  // console.log(profile);

  const [collapse, setCollapse] = useState(false);
  const [tickets, setTickets] = useState(ticketsData);
  return (
    <GlobalContext.Provider
      value={{
        // profile,
        collapse,
        setCollapse,
        setTickets,
        tickets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
