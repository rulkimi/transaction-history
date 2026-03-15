import { Text, View } from "react-native";

interface StatusBadgeProps {
  status: "Completed" | "Failed";
}

const STATUS_STYLES: Record<
  StatusBadgeProps["status"],
  { text: string; bg: string }
> = {
  Completed: {
    text: "text-green-800",
    bg: "bg-green-100 border border-green-200",
  },
  Failed: {
    text: "text-red-800",
    bg: "bg-red-100 border border-red-200",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <View
      className={`flex-row items-center px-2 py-0.5 rounded-full ${style.bg}`}
    >
      <Text className={`font-semibold text-xs ${style.text}`}>
        {status}
      </Text>
    </View>
  );
}