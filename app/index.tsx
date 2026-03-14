import { View, Text, FlatList } from "react-native";
import transactions from "@/constants/transactions.json";
import { formatPrice } from "@/utils/format-price";
import TransactionCard from "@/components/transaction-card";
import { Transaction } from "@/types";
import { Link } from "expo-router";

export default function HomeScreen() {
  const transactionHistory = transactions.history as Transaction[];
  const recentTransactions = transactionHistory.slice(0, 3);

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-primary text-5xl font-bold">
        {formatPrice(transactions.current_balance)}
      </Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Link href="/transactions" asChild>
            <View className="mt-4 px-4 py-2 bg-primary rounded-lg self-center">
              <Text className="text-primary-foreground text-center font-semibold">View More</Text>
            </View>
          </Link>
        }
      />
    </View>
  );
}
