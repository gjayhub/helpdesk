import React, { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearchParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("a");
    params.delete("day");
    params.delete("id");
    if (searchTerm.trim() !== "") {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    return params.toString();
  }, [searchParams, searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
              placeholder="Search"
              className="pl-8"
              disabled={isSubmitting}
            />
          </div>
          <Link
            href={`/home/?${handleSearchParams()}`}
            passHref
            onClick={() => setIsSubmitting(true)}
            className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Searching" : "Search"}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
