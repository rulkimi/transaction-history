import { useEffect, useRef, useState } from "react";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { Text, View } from "react-native";

export default function NetworkBanner() {
  const { isConnected } = useNetworkStatus();
  const [showConnected, setShowConnected] = useState(false);
  const prevConnected = useRef<boolean | undefined>(isConnected);

  useEffect(() => {
    if (!prevConnected.current && isConnected) {
      setShowConnected(true);
      const timeout = setTimeout(() => setShowConnected(false), 2000);
      return () => clearTimeout(timeout);
    }
    prevConnected.current = isConnected;
  }, [isConnected]);

  if (isConnected === false) {
    return (
      <View
        pointerEvents="none"
        className="absolute top-0 left-0 right-0 z-[100] items-center"
      >
        <View className="mt-10 max-w-[94%] rounded-xl px-4 py-2.5 bg-[#DC3545F2]">
          <Text className="text-white font-semibold text-sm mb-0.5 text-center">
            Offline
          </Text>
          <Text className="text-white text-xs text-center">
            You’re offline. Some features may not work until you reconnect.
          </Text>
        </View>
      </View>
    );
  }

  if (showConnected && isConnected) {
    return (
      <View
        pointerEvents="none"
        className="absolute top-0 left-0 right-0 z-[100] items-center"
      >
        <View className="mt-10 max-w-[94%] rounded-xl px-4 py-2.5 bg-[#28A745F2]">
          <Text className="text-white font-semibold text-sm mb-0.5 text-center">
            Connected
          </Text>
          <Text className="text-white text-xs text-center">
            You are back online. Everything’s up to date!
          </Text>
        </View>
      </View>
    );
  }

  return null;
}
