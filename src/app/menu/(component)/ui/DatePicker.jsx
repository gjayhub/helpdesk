"use client";

import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({ handleValueChange, value }) => {
  return (
    <Datepicker
      toggleClassName="absolute rounded-r-lg text-black right-0 top-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
      showShortcuts={true}
      showFooter={true}
      popoverDirection="down"
      configs={{
        shortcuts: {
          today: "Today",
          yesterday: "Yesterday",
          past: (period) => `Last ${period} days`,
          currentMonth: "This month",
          pastMonth: "Last month",
        },
        footer: {
          cancel: "Cancel",
          apply: "Apply",
        },
      }}
      value={value}
      onChange={handleValueChange}
    />
  );
};
export default DatePicker;
