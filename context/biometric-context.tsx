import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
} from "react";
import * as LocalAuthentication from "expo-local-authentication";
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
  supportedTypes: LocalAuthentication.AuthenticationType[];
}

interface BiometricContextType extends BiometricState {
  authenticate: () => Promise<boolean>;
  reset: () => void;
  clearError: () => void;
}

const ERROR_MESSAGES: Record<BiometricError, string> = {
  not_available: "Biometric hardware is not available on this device.",
  not_enrolled: "No biometrics enrolled. Please set up biometrics in your device settings.",
  auth_failed: "Authentication failed. Please try again.",
  cancelled: "Authentication was cancelled.",
  lockout: "Too many failed attempts. Please try again later.",
  unknown: "An unexpected error occurred. Please try again.",
};

const initialState: BiometricState = {
  isAuthenticated: false,
  isChecking: true,
  error: null,
  errorMessage: null,
  hasHardware: false,
  isEnrolled: false,
  supportedTypes: [],
};

type BiometricAction =
  | { type: "SET_CHECKING"; isChecking: boolean }
  | { type: "SET_HARDWARE_INFO"; hasHardware: boolean; isEnrolled: boolean; supportedTypes: LocalAuthentication.AuthenticationType[] }
  | { type: "SET_AUTHENTICATED"; isAuthenticated: boolean }
  | { type: "SET_ERROR"; error: BiometricError | null; message: string | null }
  | { type: "RESET" };

function biometricReducer(state: BiometricState, action: BiometricAction): BiometricState {
  switch (action.type) {
    case "SET_CHECKING":
      return { ...state, isChecking: action.isChecking };
    case "SET_HARDWARE_INFO":
      return {
        ...state,
        hasHardware: action.hasHardware,
        isEnrolled: action.isEnrolled,
        supportedTypes: action.supportedTypes,
      };
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.isAuthenticated, error: null, errorMessage: null };
    case "SET_ERROR":
      return { ...state, error: action.error, errorMessage: action.message, isChecking: false };
    case "RESET":
      return { ...initialState, isChecking: false };
    default:
      return state;
  }
}

const BiometricContext = createContext<BiometricContextType | undefined>(undefined);

export function BiometricProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(biometricReducer, initialState);
  const isInitializing = useRef(false);

  const setErrorState = useCallback((kind: BiometricError) => {
    const message = ERROR_MESSAGES[kind];
    dispatch({ type: "SET_ERROR", error: kind, message });

    if (kind !== "cancelled") {
      Alert.alert(
        kind === "lockout" ? "Account Locked" : "Biometric Error",
        message,
        [{ text: "OK", style: "default" }]
      );
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", error: null, message: null });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const checkHardware = useCallback(async () => {
    if (isInitializing.current) return;
    isInitializing.current = true;
    
    dispatch({ type: "SET_CHECKING", isChecking: true });
    try {
      const hw = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      let types: LocalAuthentication.AuthenticationType[] = [];
      
      if (enrolled) {
        types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      }

      dispatch({
        type: "SET_HARDWARE_INFO",
        hasHardware: hw,
        isEnrolled: enrolled,
        supportedTypes: types,
      });

      if (!hw) {
        setErrorState("not_available");
      } else if (!enrolled) {
        setErrorState("not_enrolled");
      }
    } catch {
      setErrorState("unknown");
    } finally {
      dispatch({ type: "SET_CHECKING", isChecking: false });
      isInitializing.current = false;
    }
  }, [setErrorState]);

  useEffect(() => {
    checkHardware();
  }, [checkHardware]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    clearError();
    dispatch({ type: "SET_CHECKING", isChecking: true });

    try {
      // Re-check hardware state before attempting
      const hw = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hw) {
        setErrorState("not_available");
        return false;
      }

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
        dispatch({ type: "SET_AUTHENTICATED", isAuthenticated: true });
        return true;
      }

      const errorResult = result as any;
      const code = errorResult.error;

      if (code === "user_cancel" || code === "system_cancel") {
        setErrorState("cancelled");
      } else if (code === "lockout" || code === "lockout_permanent") {
        setErrorState("lockout");
      } else {
        setErrorState("auth_failed");
      }
      return false;
    } catch {
      setErrorState("unknown");
      return false;
    } finally {
      dispatch({ type: "SET_CHECKING", isChecking: false });
    }
  }, [clearError, setErrorState]);

  return (
    <BiometricContext.Provider
      value={{
        ...state,
        authenticate,
        reset: resetState,
        clearError,
      }}
    >
      {children}
    </BiometricContext.Provider>
  );
}

export function useBiometrics() {
  const context = useContext(BiometricContext);
  if (context === undefined) {
    throw new Error("useBiometrics must be used within a BiometricProvider");
  }
  return context;
}
