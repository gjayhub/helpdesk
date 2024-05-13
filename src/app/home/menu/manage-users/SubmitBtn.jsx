"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
const SubmitBtn = ({ isDisabled }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || isDisabled}
      className={cn("text-center")}
      type="submit"
    >
      {pending ? (
        <>
          <Loader className="animate-spin" />
        </>
      ) : (
        "Submit changes"
      )}
    </Button>
  );
};

export default SubmitBtn;
