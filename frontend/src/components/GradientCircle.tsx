import { cn } from "@/lib/utils";
import React from "react";

type GradientCircleProps = {
  //   size: number;
  //   x: number;
  //   y: number;
  className?: string;
};

export function GradientCircle({ className }: GradientCircleProps) {
  return <div className={cn(`absolute rounded-full blur-3xl`, className)} />;
}
