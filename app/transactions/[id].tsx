import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, Platform, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTransactions } from "@/hooks/use-transactions";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/format-price";
import StatusBadge from "@/components/status-badge";
import * as Clipboard from "expo-clipboard";
import { ReactNode, useCallback } from "react";
import { CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react-native";
import ViewCard from "@/components/ui/view-card";
import Spacer from "@/components/ui/spacer";
import { usePrivacy } from "@/context/privacy-context";
import { useColorScheme } from "nativewind";

interface RowProps {
  label: string;
  value: string | number | ReactNode;
  className?: string;
}

function DetailRow({ label, value, className = "mb-2.5" }: RowProps) {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="text-foreground font-semibold">{value}</Text>
    </View>
  );
}

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const { getTransactionById } = useTransactions();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const iconColor = isDarkMode ? "#94a3b8" : "#64748b";
  const { isRevealed, togglePrivacy, isAuthenticating } = usePrivacy();

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
  const title = isDebit ? `To ${transaction.to}` : `From ${transaction.from}`;

  return (
    <ScrollView className="flex-1 bg-background px-6 py-6">
      <View className="items-center py-6">
        <View className="flex-row items-baseline mb-2">
          <View className="flex-row items-center">
            <Text className="text-foreground text-5xl font-bold">
              {isRevealed ? (
                <>
                  {isDebit ? "-" : "+"}
                  {formatPrice(transaction.amount)}
                </>
              ) : (
                "RM •••••••"
              )}
            </Text>
            <TouchableOpacity
              onPress={togglePrivacy}
              disabled={isAuthenticating}
              activeOpacity={0.7}
              className="w-10 h-10 items-center justify-center rounded-full ml-2"
              style={!isDarkMode ? { backgroundColor: '#f3f4f6' } : { backgroundColor: '#262626' }}
            >
              {isAuthenticating ? (
                <ActivityIndicator size="small" color={iconColor} />
              ) : isRevealed ? (
                <EyeOffIcon color={iconColor} size={20} />
              ) : (
                <EyeIcon color={iconColor} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-xl text-center text-foreground font-semibold mt-1">
          {title}
        </Text>
        <Text className="text-muted-foreground text-center mt-2">
          {formatDate(transaction.date)}
        </Text>
      </View>
      <Spacer size="xl" />
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
              <Text className="text-foreground font-semibold">
                {transaction.reference_id}
              </Text>
            </View>
          }
          className="mb-0"
        />
      </ViewCard>
      <Spacer />
      {(transaction.recipient_reference || transaction.payment_details || transaction.failed_reason) && (
        <ViewCard className="gap-4">
          {transaction.recipient_reference && (
            <View>
              <Text className="text-muted-foreground">Recipient reference</Text>
              <Text className="text-foreground font-semibold mt-2">
                {transaction.recipient_reference}
              </Text>
            </View>
          )}
          {transaction.payment_details && (
            <View>
              <Text className="text-muted-foreground">
                Payment details
              </Text>
              <Text className="text-foreground font-semibold mt-2">
                {transaction.payment_details}
              </Text>
            </View>
          )}
          {transaction.failed_reason && (
            <View>
              <Text className="text-muted-foreground">
                Failure reason
              </Text>
              <Text className="text-foreground font-semibold mt-2">
                {transaction.failed_reason}
              </Text>
            </View>
          )}
        </ViewCard>
      )}
    </ScrollView>
  );
}