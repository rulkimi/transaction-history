import MaskedValue from "@/components/masked-value";
import MaskedValueToggle from "@/components/masked-value-toggle";
import ViewCard from "@/components/ui/view-card";
import { Text, View } from "react-native";

interface CurrentBalanceProps {
  balance: number;
}

export default function CurrentBalance({ balance }: CurrentBalanceProps) {
  return (
    <ViewCard className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-muted-foreground text-sm font-medium">
          Current balance
        </Text>
        <MaskedValueToggle size={18} className="size-8" />
      </View>
      <MaskedValue 
        amount={balance} 
        className="text-4xl font-bold" 
      />
    </ViewCard>
  );
}