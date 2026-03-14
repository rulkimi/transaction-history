import { Transaction } from "@/types";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/format-price";
import { Text, View } from "react-native";
import StatusBadge from "./status-badge";
import { cn } from "@/utils/tailwindcss";

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

export default function TransactionCard({ transaction, className }: TransactionCardProps) {
  const isDebit = transaction.type === "debit";
  return (
    <View 
      className={cn("bg-card p-4 rounded-2xl border-border drop-shadow-sm", className)}
    >
      <View className="flex-row items-center justify-between w-full mb-2">
        <Text
          className="text-foreground font-bold text-xl flex-1"
          numberOfLines={1}
        >
          {transaction.description}
        </Text>

        <Text className={isDebit ? "text-foreground" : "text-primary"}>
          {isDebit ? "-" : "+"}
          {formatPrice(transaction.amount)}
        </Text>
      </View>
      <View className="flex-row justify-between w-full">
        <Text className="text-muted-foreground">
          {formatDate(transaction.date)}
        </Text>
        <StatusBadge status={transaction.status} />
      </View>
    </View>
  )
}
