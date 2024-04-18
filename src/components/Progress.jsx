import React from "react";

const Progress = ({ progress }) => {
  return (
    <div className="w-full max-w-60 bg-gray-400 rounded-full h-2.5">
      <div
        className="bg-yellow-300 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progress;
