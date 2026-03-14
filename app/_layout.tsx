import { Stack } from "expo-router";
import { ThemeProvider } from "@/components/theme-provider";
import "./global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "var(--background)",
          },
          headerTintColor: "var(--foreground)",
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Home", 
            headerShown: false
          }} 
        />
        <Stack.Screen
          name="transactions" 
          options={{ title: "Transactions" }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
