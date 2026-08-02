import type { ElementType, ReactNode } from "react";

type DisplayProps = {
  children: ReactNode;
  as?: ElementType;
  size?: "lg" | "sm";
  className?: string;
};

export default function Display({ children, as: Tag = "h1", size = "lg", className = "" }: DisplayProps) {
  const sizeClass = size === "lg" ? "text-display" : "text-display-sm";
  return (
    <Tag className={`font-serif font-light text-fg ${sizeClass} ${className}`}>
      {children}
    </Tag>
  );
}
