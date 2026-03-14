import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";

export default function Index() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-primary text-5xl font-bold">
        Hello World!
      </Text>
      <Text className="text-foreground mt-4">
        Current Theme: {colorScheme}
      </Text>
    </View>
  );
}
