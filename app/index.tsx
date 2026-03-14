import { View, Text, FlatList, TouchableOpacity } from "react-native";
import transactions from "@/constants/transactions.json";
import { formatPrice } from "@/utils/format-price";
import TransactionCard from "@/components/transaction-card";
import { Transaction } from "@/types";
import { Link } from "expo-router";

export default function HomeScreen() {
  const transactionHistory = transactions.history as Transaction[];
  const recentTransactions = transactionHistory.slice(0, 3);
  return (
    <View className="flex-1 p-6 bg-background">
      <View className="items-center my-8">
        <Text className="text-primary text-5xl font-bold mb-1 text-center">
          {formatPrice(transactions.current_balance)}
        </Text>
        <Text className="text-muted-foreground text-base text-center">
          Current Balance
        </Text>
      </View>
      <View className="bg-card rounded-2xl p-4 mb-0">
        <View className="flex-row items-center justify-between pb-2 border-b border-border mb-3">
          <Text className="text-foreground text-lg font-semibold">Recent Transactions</Text>
          <Link href="/transactions" asChild>
            <TouchableOpacity>
              <Text className="text-primary font-medium">View All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <FlatList
          data={recentTransactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className="mb-2">
              <TransactionCard transaction={item} className="p-2" />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View />}
        />
      </View>
    </View>
  );
}
