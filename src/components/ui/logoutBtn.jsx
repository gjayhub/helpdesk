"use client";
import { Loader, SquareArrowOutDownLeft } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
const LogoutBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      <SquareArrowOutDownLeft />
      <p>Logout</p>
    </button>
  );
};

export default LogoutBtn;
