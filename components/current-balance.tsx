import { formatPrice } from "@/utils/format-price";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { usePrivacy } from "@/context/privacy-context";
import ViewCard from "@/components/ui/view-card";

interface CurrentBalanceProps {
  balance: number;
}

export default function CurrentBalance({ balance }: CurrentBalanceProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const iconColor = isDarkMode ? "#94a3b8" : "#64748b";
  const { isRevealed, togglePrivacy, isAuthenticating } = usePrivacy();

  return (
    <ViewCard>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-muted-foreground text-sm font-medium">
          Current balance
        </Text>
        <TouchableOpacity
          onPress={togglePrivacy}
          disabled={isAuthenticating}
          activeOpacity={0.7}
          className="w-8 h-8 items-center justify-center rounded-full"
          style={!isDarkMode ? { backgroundColor: '#f3f4f6' } : { backgroundColor: '#262626' }}
        >
          {isAuthenticating ? (
            <ActivityIndicator size="small" color={iconColor} />
          ) : isRevealed ? (
            <EyeOffIcon color={iconColor} size={18} />
          ) : (
            <EyeIcon color={iconColor} size={18} />
          )}
        </TouchableOpacity>
      </View>

      <View className="flex-row items-baseline">
        {isRevealed ? (
          <Text className="text-foreground text-4xl font-bold">
            {formatPrice(balance)}
          </Text>
        ) : (
          <Text className="text-foreground text-4xl font-bold tracking-tight">
            RM •••••••
          </Text>
        )}
      </View>
    </ViewCard>
  );
}