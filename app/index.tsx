import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import transactions from "@/constants/transactions.json";
import TransactionCard from "@/components/transaction-card";
import { Transaction } from "@/types";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentBalance from "@/components/current-balance";
import { useRefresh } from "@/hooks/use-refresh";
import { BellIcon, SettingsIcon } from "lucide-react-native";
import ViewCard from "@/components/ui/view-card";

export default function HomeScreen() {
  const transactionHistory = transactions.history as Transaction[];
  const recentTransactions = transactionHistory.slice(0, 3);
  const { refreshing, onRefresh } = useRefresh();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <View>
          <Text className="text-muted-foreground text-sm font-medium">Welcome back,</Text>
          <Text className="text-foreground text-2xl font-bold">Azrul Hakimi</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            className="bg-card w-10 h-10 rounded-full items-center justify-center border border-border mr-2"
            onPress={() => alert("Notifications will be available in a future update!")}
            accessibilityLabel="Notifications (UI only)"
          >
            <BellIcon size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-card w-10 h-10 rounded-full items-center justify-center border border-border"
            onPress={() => alert("Settings coming soon!")}
            accessibilityLabel="Settings (UI only)"
          >
            <SettingsIcon size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="mt-4 px-6">
          <CurrentBalance balance={transactions.current_balance} />
        </View>

        <View className="mt-4 px-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-foreground">
              Recent Transactions
            </Text>
            <Link href="/transactions" asChild>
              <TouchableOpacity>
                <Text className="text-primary font-semibold">View All</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <ViewCard className="overflow-hidden p-0">
            {recentTransactions.map((item, idx) => (
              <View
                key={item.id}
                className={[
                  "px-6 py-4",
                  idx < recentTransactions.length - 1 ? "border-b border-border" : "",
                ].join(" ")}
              >
                <TransactionCard transaction={item} className="p-0" />
              </View>
            ))}
          </ViewCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
