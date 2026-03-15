import { useState, useCallback, type ReactNode } from "react";
import { useBiometrics } from "@/context/biometric-context";

interface BiometricProtectorProps {
  children: (props: {
    isRevealed: boolean;
    reveal: () => Promise<void>;
    hide: () => void;
    isAuthenticating: boolean;
  }) => ReactNode;
}

export function BiometricProtector({ children }: BiometricProtectorProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { authenticate, isChecking } = useBiometrics();

  const hide = useCallback(() => {
    setIsRevealed(false);
  }, []);

  const reveal = useCallback(async () => {
    if (isRevealed) {
      hide();
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
  }, [isRevealed, authenticate, hide]);

  return (
    <>
      {children({
        isRevealed,
        reveal,
        hide,
        isAuthenticating: isChecking,
      })}
    </>
  );
}
