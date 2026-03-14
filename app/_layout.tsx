import { Stack } from "expo-router";
import { ThemeProvider } from "@/components/theme-provider";
import "./global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="transactions" options={{ title: "Transactions" }} />
      </Stack>
    </ThemeProvider>
  );
}
