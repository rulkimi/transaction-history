import { usePrivacy } from "@/context/masked-value-provider";
import { cn } from "@/utils/tailwindcss";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ActivityIndicator, TouchableOpacity } from "react-native";

interface MaskedValueToggleProps {
  size?: number;
  className?: string;
}

export default function MaskedValueToggle({
  size = 20,
  className,
}: MaskedValueToggleProps) {
  const { isRevealed, togglePrivacy, isAuthenticating } = usePrivacy();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const iconColor = isDarkMode ? "#94a3b8" : "#64748b";

  return (
    <TouchableOpacity
      onPress={togglePrivacy}
      disabled={isAuthenticating}
      activeOpacity={0.7}
      className={cn(
        "items-center justify-center rounded-full size-icon-md",
        !isDarkMode ? "bg-muted/50" : "bg-muted/20",
        className,
      )}
    >
      {isAuthenticating ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : isRevealed ? (
        <EyeOffIcon color={iconColor} size={size} />
      ) : (
        <EyeIcon color={iconColor} size={size} />
      )}
    </TouchableOpacity>
  );
}
