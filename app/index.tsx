import CurrentBalance from "@/components/current-balance";
import NetworkBanner from "@/components/network-banner";
import TransactionCard from "@/components/transaction-card";
import ScreenBoundary from "@/components/ui/screen-boundary";
import ViewCard from "@/components/ui/view-card";
import { useRefresh } from "@/hooks/use-refresh";
import { ThemeMode, Transaction } from "@/types";
import { useTransactionsContext } from "@/context/transactions-context";
import { cn } from "@/utils/tailwindcss";
import { getMockPullToRefreshTransaction } from "@/utils/mock-transaction";
import { Link } from "expo-router";
import { BellIcon, SettingsIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    transactionHistory,
    setTransactionHistory,
    currentBalance,
    setCurrentBalance,
  } = useTransactionsContext();
  const recentTransactions = transactionHistory.slice(0, 3);
  const { refreshing, onRefresh } = useRefresh(async () => {
    await new Promise((resolve) => setTimeout(resolve, 750));

    const mockTransaction: Transaction = getMockPullToRefreshTransaction();
    setTransactionHistory(prev => [mockTransaction, ...prev]);
    // mock is a credit, so add its amount
    setCurrentBalance(prev => prev + mockTransaction.amount);
  });

  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === ThemeMode.Dark;
  const iconColor = isDarkMode ? "#a2a2a2" : "#626262";

  return (
    <SafeAreaView className="flex-1 bg-background">
      <NetworkBanner />
      <ScreenBoundary disablePaddingY className="pt-4 gap-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-muted-foreground text-sm font-medium">Welcome back,</Text>
            <Text className="text-foreground text-2xl font-bold">Azrul Hakimi</Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="bg-card size-icon-md rounded-full items-center justify-center border border-border"
              onPress={() => alert("Notifications will be available in a future update!")}
              accessibilityLabel="Notifications (UI only)"
            >
              <BellIcon size={20} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-card size-icon-md rounded-full items-center justify-center border border-border"
              onPress={() => alert("Settings coming soon!")}
              accessibilityLabel="Settings (UI only)"
            >
              <SettingsIcon size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>
      </ScreenBoundary>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScreenBoundary className="gap-6">
          <CurrentBalance balance={currentBalance} />
          <View>
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
                  className={cn(
                    "px-6 py-4",
                    idx < recentTransactions.length - 1 ? "border-b border-border" : ""
                  )}
                >
                  <TransactionCard transaction={item} className="p-0" />
                </View>
              ))}
            </ViewCard>
          </View>
        </ScreenBoundary>
      </ScrollView>
    </SafeAreaView>
  );
}
