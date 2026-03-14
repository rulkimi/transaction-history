import { Transaction } from "@/types";
import { Text, View } from "react-native";

interface StatusBadgeProps {
  status: Transaction["status"];
}

const STATUS_STYLES: Record<Transaction["status"], { bg: string, text: string }> = {
  Success: { bg: "bg-green-100", text: "text-green-800" },
  Failed: { bg: "bg-red-100", text: "text-red-800" },
  Reversed: { bg: "bg-yellow-100", text: "text-yellow-800" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <View className={`px-2 py-0.5 rounded-full ${style.bg}`}>
      <Text className={`text-xs font-semibold ${style.text}`}>
        {status}
      </Text>
    </View>
  );
}