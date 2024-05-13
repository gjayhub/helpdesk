"use client";
import React from "react";
import { LineChart } from "@mui/x-charts";

const uData = [40, 30, 20, 27, 18, 23, 34];
const pData = [24, 13, 98, 39, 48, 38, 43];
const sData = [34, 23, 88, 49, 47, 38, 23];
const wData = [14, 25, 67, 12, 98, 12, 98];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
const Linechart = () => {
  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: "pv" },
        { data: uData, label: "uv" },
        { data: sData, label: "sp" },
        { data: wData, label: "wp" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
  );
};

export default Linechart;
