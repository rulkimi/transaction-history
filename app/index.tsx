import { View, Text, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import transactions from "@/constants/transactions.json";
import TransactionCard from "@/components/transaction-card";
import { Transaction } from "@/types";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentBalance from "@/components/current-balance";
import { useRefresh } from "@/hooks/use-refresh";

export default function HomeScreen() {
  const transactionHistory = transactions.history as Transaction[];
  const recentTransactions = transactionHistory.slice(0, 3);
  const { refreshing, onRefresh } = useRefresh();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={recentTransactions}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 24 }}
        ListHeaderComponent={
          <>
            <CurrentBalance balance={transactions.current_balance} />
            <View className="bg-card rounded-t-2xl p-4 pb-0">
              <View className="flex-row items-center justify-between pb-2 border-b border-border">
                <Text className="text-foreground text-lg font-semibold">Recent Transactions</Text>
                <Link href="/transactions" asChild>
                  <TouchableOpacity>
                    <Text className="text-primary font-medium">View All</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View className="bg-card px-4 py-1">
            <TransactionCard transaction={item} className="p-2" />
          </View>
        )}
        ListFooterComponent={
          <View className="bg-card rounded-b-2xl h-6 mb-8" />
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
