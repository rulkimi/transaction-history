import { Transaction } from "@/types";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/format-price";
import { Text, View, TouchableOpacity } from "react-native";
import StatusBadge from "./status-badge";
import { cn } from "@/utils/tailwindcss";
import { Link } from "expo-router";

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

export default function TransactionCard({ transaction, className }: TransactionCardProps) {
  const isDebit = transaction.type === "debit";
  const isTransactionFailed = transaction.status === "Failed";
  const title = isDebit ? `To ${transaction.to}` : `From ${transaction.from}`;

  return (
    <Link href={`/transactions/${transaction.id}`} asChild>
      <TouchableOpacity 
        activeOpacity={0.7}
        className={cn("bg-card p-4 rounded-2xl border-border drop-shadow-sm", className)}
        accessibilityRole="button"
        accessibilityLabel={`View details for transaction: ${isDebit ? "To" : "From"} ${title}`}
      >
        <View className="flex-row items-center justify-between w-full mb-2">
          <Text
            className="text-foreground font-semibold text-lg flex-1"
            numberOfLines={1}
          >
            {title}
          </Text>

          <Text
            className={
              isDebit 
                ? "text-foreground" 
                : isTransactionFailed 
                  ? "text-muted-foreground" 
                  : "text-primary"
            }
          >
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
      </TouchableOpacity>
    </Link>
  );
}
