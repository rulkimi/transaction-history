import { Stack } from "expo-router";
import { ThemeProvider } from "@/components/theme-provider";
import BiometricGate from "@/components/biometric-gate";
import { useInactivity } from "@/hooks/use-inactivity";
import { useCallback, useState } from "react";
import { View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [isAppUnlocked, setIsAppUnlocked] = useState(false);

  const { resetIdleTimer } = useInactivity(isAppUnlocked, () => {
    setIsAppUnlocked(false);
  });

  const handleTouch = useCallback(() => {
    resetIdleTimer();
    return false;
  }, [resetIdleTimer]);

  return (
    <ThemeProvider>
      <View
        className="flex-1"
        onStartShouldSetResponderCapture={handleTouch}
      >
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "var(--background)" },
            headerTintColor: "var(--foreground)",
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="transactions/index"
            options={{ title: "Transactions" }}
          />
          <Stack.Screen name="transactions/[id]" options={{ title: "" }} />
        </Stack>

        {!isAppUnlocked && (
          <BiometricGate onAuthenticated={() => setIsAppUnlocked(true)} />
        )}
      </View>
    </ThemeProvider>
  );
}
