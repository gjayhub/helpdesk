import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getUsers } from "./action";
import TicketsBtn from "../(components)/TicketsBtn";
import PaginationComponent from "../(components)/pagination";
import ActionOptions from "./ActionOptions";
const ManageUsers = async ({ searchParams }) => {
  const { users, count } = await getUsers(searchParams);

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Tickets</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-center ">
                <TicketsBtn id={user.id} total={user.tickets} />
              </TableCell>
              <TableCell className="text-center [&_span]:px-2">
                <ActionOptions user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <PaginationComponent count={count} />
      </div>
    </div>
  );
};

export default ManageUsers;
