import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
