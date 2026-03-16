import { useMaskedValue } from "@/context/masked-value-provider";
import { formatPrice } from "@/utils/format-price";
import { cn } from "@/utils/tailwindcss";
import React from "react";
import { Text, TextProps } from "react-native";

interface MaskedValueProps extends TextProps {
  amount: number;
  mask?: string;
  prefix?: string;
}

export default function MaskedValue({
  amount,
  mask = "RM •••••••",
  prefix = "",
  className,
  ...props
}: MaskedValueProps) {
  const { isRevealed } = useMaskedValue();

  return (
    <Text {...props} className={cn("text-foreground", className)}>
      {isRevealed ? `${prefix}${formatPrice(amount)}` : mask}
    </Text>
  );
}
