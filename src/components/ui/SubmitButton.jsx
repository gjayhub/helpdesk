"use client";
import React from "react";
import { Button } from "./button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ text, customStyle }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={cn("text-center bg-blue-500 hover:bg-blue-700", customStyle)}
      type="submit"
    >
      {pending ? (
        <>
          <Loader className="animate-spin" />
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
