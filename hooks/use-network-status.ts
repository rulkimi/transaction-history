import { useEffect, useState } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

export function useNetworkStatus() {
  const [state, setState] = useState<NetInfoState | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((nextState) => {
      setState(nextState);
    });

    return unsubscribe;
  }, []);

  const isConnected =
    state?.isConnected !== null &&
    state?.isConnected === true &&
    state?.isInternetReachable !== false;

  return {
    isConnected,
    raw: state,
  };
}

