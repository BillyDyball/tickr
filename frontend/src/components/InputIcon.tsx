import React, { JSXElementConstructor } from "react";
import { cn } from "@/lib/utils";

export type SearchProps<T = { className: string }> = {
  Icon: JSXElementConstructor<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputIcon = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, Icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-3xl bg-slate-700 pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}
      >
        <Icon className="h-[16px] w-[16px]" />
        <input
          {...props}
          ref={ref}
          className="w-full p-2 bg-transparent placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  }
);

InputIcon.displayName = "InputIcon";
