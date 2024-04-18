import React, { useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import SubmitButton from "./ui/SubmitButton";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");
    params.delete("day");
    params.delete("id");
    if (searchTerm.trim() !== "") {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`/?${params.toString()}`);
  };

  return (
    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="flex w-full  items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
              placeholder="Search"
              className="pl-8"
            />
          </div>
          <SubmitButton text="Search" />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
