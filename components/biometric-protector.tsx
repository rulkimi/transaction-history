import { useState, useCallback } from "react";
import { useBiometrics } from "@/hooks/use-biometrics";

interface BiometricProtectorProps {
  children: (props: {
    isRevealed: boolean;
    reveal: () => Promise<void>;
    hide: () => void;
    isAuthenticating: boolean;
  }) => React.ReactNode;
}

export function BiometricProtector({ children }: BiometricProtectorProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { authenticate, isChecking } = useBiometrics();
  const [localIsAuthenticating, setLocalIsAuthenticating] = useState(false);

  const hide = useCallback(() => {
    setIsRevealed(false);
  }, []);

  const reveal = useCallback(async () => {
    if (isRevealed) {
      hide();
      return;
    }

    setLocalIsAuthenticating(true);
    try {
      const success = await authenticate();
      if (success) {
        setIsRevealed(true);
      }
    } finally {
      setLocalIsAuthenticating(false);
    }
  }, [isRevealed, authenticate, hide]);

  return (
    <>
      {children({
        isRevealed,
        reveal,
        hide,
        isAuthenticating: localIsAuthenticating || (isChecking && !isRevealed),
      })}
    </>
  );
}
