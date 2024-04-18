"use client";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import jsPDF from "jspdf";

import "jspdf-autotable";

const ReportTickets = ({ tickets }) => {
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
  const filteredTickets = tickets.filter((ticket) => {
    const ticketDate = new Date(ticket.created_at);
    const formatTicketDate = ticketDate.toISOString().slice(0, 10);

    return (
      formatTicketDate >= value.startDate && formatTicketDate <= value.endDate
    );
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: "#report-table",
      headStyles: { fillColor: "#40A2E3" },
      theme: "grid",
    });
    doc.save("Report.pdf");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-4">
        <button
          className="bg-blue-400 text-slate-50 rounded-sm px-1 hover:bg-primary-500"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
        <div className="w-1/3">
          <DatePicker handleValueChange={handleValueChange} value={value} />
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
        <div>
          <table
            id="report-table"
            className="text-sm w-full text-left rtl:text-right text-black "
          >
            <thead className="text-xs  uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Sender
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => {
                return (
                  <tr
                    key={ticket.ticket_id}
                    className="odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {ticket.title}
                    </th>
                    <td className="px-6 py-4 text-center">
                      {ticket.description}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {ticket.profiles?.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {ticket.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {ticket.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {ticket.progress}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportTickets;
