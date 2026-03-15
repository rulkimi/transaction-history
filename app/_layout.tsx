import BiometricGate from "@/components/biometric-gate";
import MaskedValueToggle from "@/components/masked-value-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { BiometricProvider } from "@/context/biometric-context";
import { MaskedValueProvider } from "@/context/masked-value-provider";
import { useInactivity } from "@/hooks/use-inactivity";
import { Stack } from "expo-router";
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
      <BiometricProvider>
        <MaskedValueProvider>
          <View
            className="flex-1"
            onStartShouldSetResponderCapture={handleTouch}
          >
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: "var(--background)" },
                headerTintColor: "var(--foreground)",
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen
                name="index"
                options={{ title: "Home", headerShown: false }}
              />
              <Stack.Screen
                name="transactions/index"
                options={{
                  title: "Transactions",
                  headerRight: () => (
                    <MaskedValueToggle
                      size={22}
                      className="size-10 bg-transparent"
                    />
                  ),
                }}
              />
              <Stack.Screen name="transactions/[id]" options={{ title: "" }} />
            </Stack>
            {!isAppUnlocked && (
              <BiometricGate onAuthenticated={() => setIsAppUnlocked(true)} />
            )}
          </View>
        </MaskedValueProvider>
      </BiometricProvider>
    </ThemeProvider>
  );
}
