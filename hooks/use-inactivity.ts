import { useCallback, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { AUTH_EXPIRY_MS } from "@/constants/auth";

export function useInactivity(onLock: () => void) {
  const backgroundedAt = useRef<number | null>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      onLock();
    }, AUTH_EXPIRY_MS);
  }, [onLock]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        const prev = appState.current;
        appState.current = nextState;
        // When moving to background, record the time
        if (
          (prev === "active" || prev === "inactive") &&
          nextState === "background"
        ) {
          backgroundedAt.current = Date.now();
        }

        // When returning to active state
        if (nextState === "active" && backgroundedAt.current !== null) {
          const elapsed = Date.now() - backgroundedAt.current;
          backgroundedAt.current = null;

          if (elapsed >= AUTH_EXPIRY_MS) {
            onLock();
          } else {
            resetIdleTimer();
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [resetIdleTimer, onLock]);

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return {
    resetIdleTimer,
  };
}
