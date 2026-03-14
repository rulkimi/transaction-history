import { View, FlatList } from "react-native";
import transactions from "@/constants/transactions.json";
import TransactionCard from "@/components/transaction-card";
import { Transaction } from "@/types";

export default function TransactionsScreen() {
  const transactionHistory = transactions.history as Transaction[];

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <FlatList
        data={transactionHistory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
