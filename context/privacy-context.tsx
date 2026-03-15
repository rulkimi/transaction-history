import React, { createContext, useContext, useState, useCallback } from "react";
import { useBiometrics } from "@/hooks/use-biometrics";

interface PrivacyContextType {
  isRevealed: boolean;
  togglePrivacy: () => Promise<void>;
  isAuthenticating: boolean;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useBiometrics();

  const togglePrivacy = useCallback(async () => {
    if (isRevealed) {
      setIsRevealed(false);
      return;
    }

    setIsAuthenticating(true);
    try {
      const success = await authenticate();
      if (success) {
        setIsRevealed(true);
      }
    } finally {
      setIsAuthenticating(false);
    }
  }, [isRevealed, authenticate]);

  return (
    <PrivacyContext.Provider
      value={{
        isRevealed,
        togglePrivacy,
        isAuthenticating,
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error("usePrivacy must be used within a PrivacyProvider");
  }
  return context;
}
