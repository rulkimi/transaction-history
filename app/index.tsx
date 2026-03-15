import { View, Text, FlatList, TouchableOpacity } from "react-native";
import transactions from "@/constants/transactions.json";
import TransactionCard from "@/components/transaction-card";
import { Transaction } from "@/types";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentBalance from "@/components/current-balance";

export default function HomeScreen() {
  const transactionHistory = transactions.history as Transaction[];
  const recentTransactions = transactionHistory.slice(0, 3);
  return (
    <SafeAreaView className="flex-1 p-6 bg-background">
      <CurrentBalance balance={transactions.current_balance} />
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
    </SafeAreaView>
  );
}
