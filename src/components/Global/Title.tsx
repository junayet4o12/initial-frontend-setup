import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TitleProps = {
  children: ReactNode;
  className?: string;
};

export default function Title({ children, className }: TitleProps) {
  return (
    <h1 className={cn("text-2xl md:text-3xl lg:text-4xl font-bold text-[#161922]", className)}>
      {children}
    </h1>
  );
}
