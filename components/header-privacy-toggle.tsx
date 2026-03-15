import React from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { usePrivacy } from "@/context/privacy-context";
import { useColorScheme } from "nativewind";

export default function HeaderPrivacyToggle() {
  const { isRevealed, togglePrivacy, isAuthenticating } = usePrivacy();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const iconColor = isDarkMode ? "#94a3b8" : "#64748b";

  return (
    <TouchableOpacity
      onPress={togglePrivacy}
      disabled={isAuthenticating}
      activeOpacity={0.7}
    >
      <View className="ml-2">
        {isAuthenticating ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : isRevealed ? (
          <EyeOffIcon size={22} color={iconColor} />
        ) : (
          <EyeIcon size={22} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  );
}
