import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SubtitleProps = {
  children: ReactNode;
  className?: string;
};

export default function Subtitle({ children, className }: SubtitleProps) {
  return (
    <h2 className={cn("text-sm md:text-base text-[#161922CC]", className)}>
      {children}
    </h2>
  );
}
