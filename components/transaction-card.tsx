import MaskedValue from "@/components/masked-value";
import { Transaction, TransactionStatus, TransactionType } from "@/types";
import { formatDate } from "@/utils/date";
import { cn } from "@/utils/tailwindcss";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import StatusBadge from "./status-badge";

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

export default function TransactionCard({ transaction, className }: TransactionCardProps) {
  const isDebit = transaction.type === TransactionType.Debit;
  const isTransactionFailed = transaction.status === TransactionStatus.Failed;
  const title = isDebit ? `To ${transaction.to}` : `From ${transaction.from}`;

  return (
    <Link href={`/transactions/${transaction.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        className={cn("bg-card p-4 rounded-2xl border-border drop-shadow-sm gap-2", className)}
        accessibilityRole="button"
        accessibilityLabel={`View details for transaction: ${isDebit ? "To" : "From"} ${title}`}
      >
        <View className="flex-row items-center justify-between w-full gap-2">
          <Text
            className="text-foreground font-semibold text-lg flex-1"
            numberOfLines={1}
          >
            {title}
          </Text>

          <MaskedValue
            amount={transaction.amount}
            mask="RM ••••"
            prefix={isDebit ? "-" : "+"}
            className={cn(
              "bg-transparent font-medium",
              isTransactionFailed
                ? "text-muted-foreground"
                : isDebit
                  ? "text-foreground"
                  : "text-primary"
            )}
          />
        </View>
        <View className="flex-row justify-between w-full items-center">
          <Text className="text-muted-foreground text-sm">
            {formatDate(transaction.date)}
          </Text>
          <StatusBadge status={transaction.status} />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

