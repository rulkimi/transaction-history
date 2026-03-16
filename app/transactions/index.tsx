import { View, FlatList, Text, RefreshControl } from "react-native";
import TransactionCard from "@/components/transaction-card";
import { useTransactions } from "@/hooks/use-transactions";
import { useRefresh } from "@/hooks/use-refresh";
import { formatDate } from "@/utils/date";
import Spacer from "@/components/ui/spacer";
import ScreenBoundary from "@/components/ui/screen-boundary";
import { getMockPullToRefreshTransaction } from "@/utils/mock-transaction";

export default function TransactionsScreen() {
  const {
    groupedTransactions,
    setTransactionHistory,
    setCurrentBalance,
  } = useTransactions();
  const { refreshing, onRefresh } = useRefresh(async () => {
    await new Promise(resolve => setTimeout(resolve, 750));

    const mockTransaction = getMockPullToRefreshTransaction();
    setTransactionHistory(prev => [mockTransaction, ...prev]);
    setCurrentBalance(prev => prev + mockTransaction.amount);
  });

  return (
    <ScreenBoundary className="flex-1 bg-background" disablePaddingY>
      <FlatList
        data={groupedTransactions}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <View className="gap-2.5 mt-4">
            <Text className="text-muted-foreground text-sm font-semibold uppercase">
              {formatDate(item.date, { time: false })}
            </Text>
            {item.data.map(transaction => (
              <View key={transaction.id}>
                <TransactionCard transaction={transaction} />
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </ScreenBoundary>
  );
}