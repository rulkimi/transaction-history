import { formatPrice } from "@/utils/format-price";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useColorScheme } from "nativewind";

interface CurrentBalanceProps {
  balance: number;
}

export default function CurrentBalance({ balance }: CurrentBalanceProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View className="items-center my-8">
      <View className="flex-row items-center justify-center mb-1">
        <Text className="text-primary text-5xl font-bold text-center mr-2">
          {isVisible ? formatPrice(balance) : "RM •••••"}
        </Text>
        <TouchableOpacity 
          onPress={() => setIsVisible((prev) => !prev)}
          className="ml-2"
          accessibilityRole="button"
          accessibilityLabel={isVisible ? "Hide balance" : "Show balance"}
        >
          {isVisible ? (
            <EyeOff color={isDarkMode ? "white" : "black"} size={24} />
          ) : (
            <Eye color={isDarkMode ? "white" : "dark"} size={24} />
          )}
        </TouchableOpacity>
      </View>
      <Text className="text-muted-foreground text-base text-center">
        Current Balance
      </Text>
    </View>
  );
}