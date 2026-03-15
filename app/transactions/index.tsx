import { View, FlatList, Text, RefreshControl } from "react-native";
import TransactionCard from "@/components/transaction-card";
import { useTransactions } from "@/hooks/use-transactions";
import { useRefresh } from "@/hooks/use-refresh";
import { formatDate } from "@/utils/date";
import Spacer from "@/components/ui/spacer";

export default function TransactionsScreen() {
  const { groupedTransactions } = useTransactions();
  const { refreshing, onRefresh } = useRefresh();

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
            {item.data.map(transaction => (
              <View key={transaction.id} className="mb-3.5">
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
    </View>
  );
}