import React, { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const AgencyTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("");

  const tabs = [
    { id: "tab1", label: "LGC", href: "/path-to-lgc" },
    { id: "tab2", label: "NGA", href: "/path-to-nga" },
    { id: "tab3", label: "SUC/SCHOOL", href: "/path-to-suc-school" },
    { id: "tab4", label: "HOSPITAL", href: "/path-to-hospital" },
  ];

  const params = new URLSearchParams(searchParams);

  return (
    <div className=" w-full">
      <div className="flex border-b border-gray-300 justify-around">
        {tabs.map((tab) => (
          <Link
            href={`/home?ESS`}
            key={tab.id}
            className={`px-4 py-2 focus:outline-none `}
            // onClick={() => handleSearchParams(tab.id)}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AgencyTabs;
