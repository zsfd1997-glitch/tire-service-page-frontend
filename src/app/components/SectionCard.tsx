import type { HTMLAttributes } from "react";
import { cn } from "./ui/utils";

export function SectionCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/80 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
