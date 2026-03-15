import { Stack } from "expo-router";
import { ThemeProvider } from "@/components/theme-provider";
import BiometricGate from "@/components/biometric-gate";
import { useInactivity } from "@/hooks/use-inactivity";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { PrivacyProvider } from "@/context/privacy-context";
import HeaderPrivacyToggle from "@/components/header-privacy-toggle";
import "./global.css";

function AppContent() {
  const [isAppUnlocked, setIsAppUnlocked] = useState(false);

  const { resetIdleTimer } = useInactivity(isAppUnlocked, () => {
    setIsAppUnlocked(false);
  });

  const handleTouch = useCallback(() => {
    resetIdleTimer();
    return false;
  }, [resetIdleTimer]);

  return (
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
            headerRight: () => <HeaderPrivacyToggle />,
          }}
        />
        <Stack.Screen 
          name="transactions/[id]" 
          options={{ title: "" }} 
        />
      </Stack>

      {!isAppUnlocked && (
        <BiometricGate onAuthenticated={() => setIsAppUnlocked(true)} />
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <PrivacyProvider>
        <AppContent />
      </PrivacyProvider>
    </ThemeProvider>
  );
}
