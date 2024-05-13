"use client";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const ReportList = ({ tickets }) => {
  const today = new Date().toISOString().slice(0, 10);
  const lastWeek = new Date(today);
  const { toast } = useToast();

  lastWeek.setDate(lastWeek.getDate() - 7);
  const [value, setValue] = useState({
    startDate: lastWeek.toISOString().slice(0, 10),
    endDate: today,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const ticketDate = new Date(ticket.created_at);
    const formatTicketDate = ticketDate.toISOString().slice(0, 10);

    return (
      formatTicketDate >= value.startDate && formatTicketDate <= value.endDate
    );
  });

  const ticketCountsByDay = {};

  // Loop through each ticket
  filteredTickets.forEach((ticket) => {
    // Extract the date from the createdAt field
    const createdAtDate = new Date(ticket.created_at).toDateString();

    // If the date is not already a key in ticketCountsByDay, initialize it with counts
    if (!ticketCountsByDay[createdAtDate]) {
      ticketCountsByDay[createdAtDate] = {
        notStarted: 0,
        onGoing: 0,
        resolved: 0,
      };
    }

    // Increment the count based on the status of the ticket
    switch (ticket.status.toLowerCase()) {
      case "new":
        ticketCountsByDay[createdAtDate]["notStarted"]++;
        break;
      case "ongoing":
        ticketCountsByDay[createdAtDate]["onGoing"]++;
        break;
      case "resolved":
        ticketCountsByDay[createdAtDate]["resolved"]++;
        break;
      default:
        break;
    }
  });

  const checkNumber = (number, day, filter) => {
    // const date = day.slice(0, 10);
    if (number === 0) {
      return (
        <span
          onClick={() => {
            toast({
              title: "No tickets availale",
              description: "There is no ticket found to display.",
            });
          }}
        >
          {number}
        </span>
      );
    }

    return <Link href={`/home?day=${day}&filter=${filter}`}>{number}</Link>;
  };
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: "#report-table",
      headStyles: { fillColor: "#40A2E3" },
      theme: "grid",
      styles: {
        halign: "center",
      },
    });
    doc.save("Report.pdf");
  };
  let totalNotStarted = 0;
  let totalOnGoing = 0;
  let totalResolved = 0;

  // Loop through ticketCountsByDay to sum up totals
  Object.values(ticketCountsByDay).forEach((counts) => {
    totalNotStarted += counts.notStarted;
    totalOnGoing += counts.onGoing;
    totalResolved += counts.resolved;
  });
  return (
    <div className="ml-10  w-3/4">
      <div className="flex justify-between items-center px-4">
        <button
          className="bg-blue-400 text-slate-50  rounded-sm px-1 hover:bg-blue-500"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
        <div className="w-1/3">
          <DatePicker handleValueChange={handleValueChange} value={value} />
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        {filteredTickets.length !== 0 ? (
          <div>
            <table
              id="report-table"
              className="text-sm w-full text-left rtl:text-right text-black "
            >
              <thead className="text-xs  uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    New
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    On going
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Resolved
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(ticketCountsByDay).map((day, _index) => {
                  const counts = ticketCountsByDay[day];
                  return (
                    <tr
                      key={day}
                      className="odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {day}
                      </th>
                      <td className="px-6 py-4 text-center">
                        {checkNumber(counts["notStarted"], day, "new")}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {checkNumber(counts["onGoing"], day, "ongoing")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {checkNumber(counts["resolved"], day, "resolved")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th className="px-6 py-3" colSpan={1}>
                    Total:
                  </th>
                  <th className="px-6 py-3 text-center">{totalNotStarted}</th>
                  <th className="px-6 py-3 text-center">{totalOnGoing}</th>
                  <th className="px-6 py-3 text-center">{totalResolved}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <h4 className="text-center">No ticket found</h4>
        )}
      </div>
    </div>
  );
};

export default ReportList;
