"use client";
import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const PaginationComponent = ({ count }) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const filter = searchParams.get("filter") || null; // Change to null instead of {}
  const query = searchParams.get("query") || null; // Change to null instead of {}
  const totalCount = count;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <Pagination
      page={page}
      count={totalPages}
      color="standard"
      sx={{
        "> ul": {
          justifyContent: "center",
        },
      }}
      defaultPage={1}
      shape="rounded"
      showFirstButton
      showLastButton
      renderItem={(item) => {
        const queryParams = {};
        if (query) {
          queryParams.query = query;
        }
        if (filter) {
          queryParams.filter = filter;
        }
        return (
          <Link
            href={{
              pathname: "/menu/ManageUsers",
              query: {
                ...queryParams,
                page: item.page,
              },
            }}
            style={{
              pointerEvents: item.disabled ? "none" : "auto",
            }}
          >
            <PaginationItem sx={{ color: "#050315" }} {...item} />
          </Link>
        );
      }}
    />
  );
};

export default PaginationComponent;
