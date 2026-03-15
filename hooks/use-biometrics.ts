import * as LocalAuthentication from "expo-local-authentication";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";


export type BiometricError =
  | "not_available"
  | "not_enrolled"
  | "auth_failed"
  | "cancelled"
  | "lockout"
  | "unknown";

export interface BiometricState {
  isAuthenticated: boolean;
  isChecking: boolean;
  error: BiometricError | null;
  errorMessage: string | null;
  hasHardware: boolean;
  isEnrolled: boolean;
  authenticate: () => Promise<boolean>;
  reset: () => void;
}

const ERROR_MESSAGES: Record<BiometricError, string> = {
  not_available: "Biometric hardware is not available on this device.",
  not_enrolled:
    "No biometrics enrolled. On a simulator, go to Features → Face ID → Enrolled. On a real device, set up Face ID or fingerprint in Settings.",
  auth_failed: "Authentication failed. Please try again.",
  cancelled: "Authentication was cancelled.",
  lockout: "Too many failed attempts. Please try again later.",
  unknown: "An unexpected error occurred. Please try again.",
};

export function useBiometrics(): BiometricState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<BiometricError | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasHardware, setHasHardware] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const setErrorState = useCallback((kind: BiometricError) => {
    const message = ERROR_MESSAGES[kind];
    console.log("[Biometrics] ❌ Error:", kind, "—", message);
    setError(kind);
    setErrorMessage(message);

    if (kind !== "cancelled") {
      Alert.alert(
        kind === "lockout" ? "Account Locked" : "Biometric Error",
        message,
        [{ text: "OK", style: "default" }]
      );
    }
  }, []);


  const clearError = useCallback(() => {
    setError(null);
    setErrorMessage(null);
  }, []);

  const reset = useCallback(() => {
    console.log("[Biometrics] 🔒 Session reset — re-authentication required");
    setIsAuthenticated(false);
    clearError();
  }, [clearError]);

  // Check hardware & enrollment
  useEffect(() => {
    (async () => {
      try {
        const hw = await LocalAuthentication.hasHardwareAsync();
        setHasHardware(hw);

        if (!hw) {
          setErrorState("not_available");
          setIsChecking(false);
          return;
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setIsEnrolled(enrolled);

        if (!enrolled) {
          setErrorState("not_enrolled");
        }
      } catch (e) {
        setErrorState("unknown");
      } finally {
        setIsChecking(false);
      }
    })();
  }, [setErrorState]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    clearError();
    setIsChecking(true);

    try {
      const hw = await LocalAuthentication.hasHardwareAsync();
      if (!hw) {
        setErrorState("not_available");
        return false;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        setErrorState("not_enrolled");
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
        requireConfirmation: true,
      });

      if (result.success) {
        setIsAuthenticated(true);
        clearError();
        return true;
      }

      const code = (
        result as LocalAuthentication.LocalAuthenticationResult & {
          error?: string;
        }
      ).error;

      if (code === "user_cancel" || code === "system_cancel") {
        setErrorState("cancelled");
      } else if (code === "lockout" || code === "lockout_permanent") {
        setErrorState("lockout");
      } else if (code === "not_enrolled") {
        setErrorState("not_enrolled");
      } else if (code === "not_available" || code === "biometryNotAvailable") {
        setErrorState("not_available");
      } else {
        setErrorState("auth_failed");
      }

      return false;
    } catch (e) {
      setErrorState("unknown");
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [clearError, setErrorState]);

  return {
    isAuthenticated,
    isChecking,
    error,
    errorMessage,
    hasHardware,
    isEnrolled,
    authenticate,
    reset,
  };
}
