import { View, FlatList, Text, RefreshControl } from "react-native";
import { useCallback, useState } from "react";
import TransactionCard from "@/components/transaction-card";
import { useTransactions } from "@/hooks/use-transactions";
import { formatDate } from "@/utils/date";

export default function TransactionsScreen() {
  const { groupedTransactions } = useTransactions();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 750);
  }, []);

  return (
    <View className="flex-1 p-6 bg-background">
      <FlatList
        data={groupedTransactions}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <View>
            <Text className="text-muted-foreground text-sm font-semibold mb-2 mt-2 uppercase">
              {formatDate(item.date, { time: false })}
            </Text>
            {item.data.map(tx => (
              <View key={tx.id} className="mb-3.5">
                <TransactionCard transaction={tx} />
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-4" />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}