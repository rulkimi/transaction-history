import { ThemeMode, ThemeModeValue, TransactionStatus, TransactionStatusValue } from "@/types";
import { Text, View } from "react-native";
import { cn } from "@/utils/tailwindcss";
import { useColorScheme } from "nativewind";

interface StatusBadgeProps {
  status: TransactionStatusValue;
}

const STATUS_STYLES: Record<
  TransactionStatusValue,
  Record<ThemeModeValue, { bg: string; border: string; text: string }>
> = {
  [TransactionStatus.Completed]: {
    [ThemeMode.Light]: {
      bg: "bg-[#e7faef]",
      border: "border-[#69e19a]",
      text: "text-[#17854f]",
    },
    [ThemeMode.Dark]: {
      bg: "bg-[#16432b]",
      border: "border-[#63e7aa]",
      text: "text-[#8af5c7]",
    },
  },
  [TransactionStatus.Failed]: {
    [ThemeMode.Light]: {
      bg: "bg-[#fde7e7]",
      border: "border-[#f09797]",
      text: "text-[#b91c1c]",
    },
    [ThemeMode.Dark]: {
      bg: "bg-[#441818]",
      border: "border-[#eb6d6d]",
      text: "text-[#fca5a5]",
    },
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { colorScheme } = useColorScheme();
  const theme: ThemeModeValue =
    colorScheme === ThemeMode.Dark ? ThemeMode.Dark : ThemeMode.Light;
  const styles = STATUS_STYLES[status] ? STATUS_STYLES[status][theme] : STATUS_STYLES[TransactionStatus.Completed][theme];

  return (
    <View
      className={cn(
        "flex-row items-center px-2.5 py-0.5 rounded-full border",
        styles.bg,
        styles.border
      )}
    >
      <Text
        className={cn(
          "font-bold text-[10px] uppercase tracking-wider",
          styles.text
        )}
      >
        {status}
      </Text>
    </View>
  );
}