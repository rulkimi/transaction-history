import { Transaction } from "@/types";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import { Text, View } from "react-native";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isDebit = transaction.type === "debit";
  return (
    <View className="flex-1 flex-row justify-between">
      <Text className="text-muted-foreground">
        {formatDate(transaction.date)}
      </Text>
      <Text
        className={isDebit ? "text-destructive" : "text-primary"}
      >
        {isDebit ? "-" : "+"}
        {formatPrice(transaction.amount)}
      </Text>
    </View>
  )
}