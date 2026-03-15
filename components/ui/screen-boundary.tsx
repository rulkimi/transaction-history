import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/utils/tailwindcss";

interface ScreenBoundaryProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  disablePaddingX?: boolean;
  disablePaddingY?: boolean;
}

export default function ScreenBoundary({
  children,
  className,
  disablePaddingX = false,
  disablePaddingY = false,
  ...props
}: ScreenBoundaryProps) {
  return (
    <View
      className={cn(
        !disablePaddingX && "px-6",
        !disablePaddingY && "py-4",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
