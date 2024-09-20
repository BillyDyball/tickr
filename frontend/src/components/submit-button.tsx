"'use client'";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`
        relative overflow-hidden bg-gradient-to-r from-green-400 to-green-600 
        hover:from-green-500 hover:to-green-700 text-white font-semibold
        transition-all duration-300 ease-in-out transform hover:scale-105
        ${className || ""}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 
                opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
    </Button>
  );
}
