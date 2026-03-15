import { useBiometrics } from "@/context/biometric-context";
import React, { createContext, useCallback, useContext, useState } from "react";

interface MaskedValueType {
  isRevealed: boolean;
  togglePrivacy: () => Promise<void>;
  isAuthenticating: boolean;
}

const MaskedValue = createContext<MaskedValueType | undefined>(undefined);

export function MaskedValueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { authenticate, isChecking } = useBiometrics();

  const togglePrivacy = useCallback(async () => {
    if (isRevealed) {
      setIsRevealed(false);
      return;
    }

    try {
      const success = await authenticate();
      if (success) {
        setIsRevealed(true);
      }
    } catch {
      // Error handled by biometric context
    }
  }, [isRevealed, authenticate]);

  return (
    <MaskedValue.Provider
      value={{
        isRevealed,
        togglePrivacy,
        isAuthenticating: isChecking,
      }}
    >
      {children}
    </MaskedValue.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(MaskedValue);
  if (context === undefined) {
    throw new Error("usePrivacy must be used within a MaskedValueProvider");
  }
  return context;
}
