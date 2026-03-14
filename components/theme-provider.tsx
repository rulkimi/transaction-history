import React from "react";
import { View, ViewProps } from "react-native";
import { useColorScheme } from "nativewind";
import { themes } from "@/constants/themes";

interface ThemeProviderProps extends ViewProps {
  name?: keyof typeof themes;
  children: React.ReactNode;
}

export function ThemeProvider({
  name = "default",
  children,
  style,
  ...props
}: ThemeProviderProps) {
  const { colorScheme } = useColorScheme();
  const themeVars = themes[name][colorScheme ?? "light"];

  return (
    <View
      key={colorScheme}
      style={[themeVars, style]}
      className="flex-1"
      {...props}
    >
      {children}
    </View>
  );
}
