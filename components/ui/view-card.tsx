import type { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/utils/tailwindcss";

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export default function ViewCard({
  children,
  className = "",
  elevated = true,
  ...rest
}: CardProps) {
  return (
    <View
      className={cn(
        "bg-card rounded-2xl px-5 py-6",
        elevated ? "drop-shadow-md" : "",
        className
      )}
      {...rest}
    >
      {children}
    </View>
  );
}