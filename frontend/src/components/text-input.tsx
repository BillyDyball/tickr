"'use client'";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export function TextInput({
  label,
  id,
  error,
  className,
  ...props
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        className={`w-full ${error ? "border-red-500" : ""} ${className || ""}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
