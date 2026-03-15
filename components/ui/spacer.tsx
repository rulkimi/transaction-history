import { View, ViewProps } from "react-native";

type SpacerSize = `${"" | "2" | "3" | "4" | "5"}xl` | "xs" | "sm" | "md" | "lg" | "xl" | number;

interface SpacerProps extends Omit<ViewProps, "children"> {
  size?: SpacerSize;
  horizontal?: boolean;
  className?: string;
}

export default function Spacer({
  size = "md",
  horizontal = false,
  className,
  style,
  ...rest
}: SpacerProps) {
  const sizeMap: Record<string, number> = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 40,
    "3xl": 48,
    "4xl": 64,
    "5xl": 80,
  };

  const dimension = typeof size === "number" ? size : sizeMap[size] ?? sizeMap["md"];

  return (
    <View
      style={[
        horizontal
          ? { width: dimension, height: 0 }
          : { height: dimension, width: 0 },
        style,
      ]}
      className={className}
      {...rest}
    />
  );
}