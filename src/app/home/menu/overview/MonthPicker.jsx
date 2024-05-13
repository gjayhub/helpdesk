"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import DatePicker from "../(components)/DatePicker";
import { useState } from "react";

const MonthPicker = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const lastWeek = new Date(today);

  lastWeek.setDate(lastWeek.getDate() - 7);
  const [value, setValue] = useState({
    startDate: lastWeek.toISOString().slice(0, 10),
    endDate: today,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    console.log("newValue:", newValue);
  };

  const params = new URLSearchParams(searchParams);

  return (
    <div className="w-1/3">
      <DatePicker handleValueChange={handleValueChange} value={value} />
    </div>
    // <Select onValueChange={handleChange}>
    //   <SelectTrigger className="w-[180px]">
    //     <SelectValue placeholder="Select month" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     <SelectGroup>
    //       <SelectItem value="january">January</SelectItem>
    //       <SelectItem value="ferbruary">Ferbruary</SelectItem>
    //       <SelectItem value="march">March</SelectItem>
    //       <SelectItem value="april">April</SelectItem>
    //       <SelectItem value="june">June</SelectItem>
    //       <SelectItem value="july">July</SelectItem>
    //       <SelectItem value="august">August</SelectItem>
    //       <SelectItem value="september">September</SelectItem>
    //       <SelectItem value="october">October</SelectItem>
    //       <SelectItem value="november">November</SelectItem>
    //       <SelectItem value="december">December</SelectItem>
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
  );
};

export default MonthPicker;
