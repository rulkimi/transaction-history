import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, Platform, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTransactions } from "@/hooks/use-transactions";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/format-price";
import StatusBadge from "@/components/status-badge";
import * as Clipboard from "expo-clipboard";
import { ReactNode, useCallback } from "react";
import { CopyIcon } from "lucide-react-native";
import ViewCard from "@/components/ui/view-card";
import Spacer from "@/components/ui/spacer";

interface RowProps {
  label: string;
  value: string | number | ReactNode;
  className?: string;
}

function DetailRow({ label, value, className = "mb-2.5" }: RowProps) {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="text-foreground">{value}</Text>
    </View>
  );
}

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const { getTransactionById } = useTransactions();

  const idStr = Array.isArray(id) ? id[0] : id;
  const transaction = getTransactionById(idStr);

  const handleCopyId = useCallback(async () => {
    await Clipboard.setStringAsync(transaction?.reference_id || "");
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied to clipboard!');
    }
  }, [transaction]);

  if (!transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-foreground text-lg">Transaction not found.</Text>
      </View>
    );
  }

  const isDebit = transaction.type === "debit";
  const title = isDebit ? `to ${transaction.to}` : `from ${transaction.from}`;

  return (
    <ScrollView className="flex-1 bg-background px-6 py-12">
      <View>
        <Text className="text-foreground text-4xl font-bold text-center">
          {isDebit ? "-" : "+"}
          {formatPrice(transaction.amount)}
        </Text>
        <Text className="text-xl text-center text-foreground font-bold mt-1">
          {title}
        </Text>
        <Text className="text-foreground text-center mt-4">
          {formatDate(transaction.date)}
        </Text>
      </View>
      <Spacer size="2xl" />
      <ViewCard>
        <DetailRow
          label="Status"
          value={<StatusBadge status={transaction.status} />}
        />
        <DetailRow
          label="From"
          value={transaction.from}
        />
        <DetailRow
          label="Transaction type"
          value={<Text className="capitalize text-foreground">{transaction.transaction_type}</Text>}
        />
        <DetailRow
          label="Reference ID"
          value={
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={handleCopyId}
                accessibilityRole="button"
                accessibilityLabel="Copy Transaction ID"
                className="p-1 mr-1"
              >
                <CopyIcon size={12} color="blue" />
              </TouchableOpacity>
              <Text className="text-foreground">{transaction.reference_id}</Text>
            </View>
          }
          className="mb-0"
        />
      </ViewCard>
      <Spacer />
      <ViewCard>
        <Text className="text-muted-foreground">Payment details</Text>
        <Text className="text-foreground font-semibold mt-2">{transaction.description}</Text>
      </ViewCard>
    </ScrollView>
  );
}