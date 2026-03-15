import { formatPrice } from "@/utils/format-price";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { EyeIcon, EyeOffIcon, ShieldCheck } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { BiometricProtector } from "./biometric-protector";

interface CurrentBalanceProps {
  balance: number;
}

export default function CurrentBalance({ balance }: CurrentBalanceProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const iconColor = isDarkMode ? "#f1f5f9" : "#0f172a";

  return (
    <BiometricProtector>
      {({ isRevealed, reveal, isAuthenticating }) => (
        <View className="items-center my-8">
          <View className="flex-row items-center justify-center mb-1">
            <Text className="text-primary text-5xl font-bold text-center mr-2">
              {isRevealed ? formatPrice(balance) : "RM •••••"}
            </Text>

            <TouchableOpacity
              onPress={reveal}
              className="ml-2"
              disabled={isAuthenticating}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={
                isRevealed ? "Hide balance" : "Show balance with biometrics"
              }
            >
              {isAuthenticating ? (
                <ActivityIndicator size="small" color={iconColor} />
              ) : isRevealed ? (
                <EyeOffIcon color={iconColor} size={24} />
              ) : (
                <View className="relative">
                  <EyeIcon color={iconColor} size={24} />
                  <ShieldCheck
                    size={12}
                    color="#3b82f6"
                    className="absolute -bottom-0.5 -right-1"
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-muted-foreground text-base text-center">
            Current Balance
          </Text>
        </View>
      )}
    </BiometricProtector>
  );
}