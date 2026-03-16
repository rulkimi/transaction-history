import MaskedValue from "@/components/masked-value";
import MaskedValueToggle from "@/components/masked-value-toggle";
import StatusBadge from "@/components/status-badge";
import ScreenBoundary from "@/components/ui/screen-boundary";
import Spacer from "@/components/ui/spacer";
import ViewCard from "@/components/ui/view-card";
import { useTransactions } from "@/hooks/use-transactions";
import { TransactionType } from "@/types";
import { copyToClipboard } from "@/utils/clipboard";
import { formatDate } from "@/utils/date";
import { cn } from "@/utils/tailwindcss";
import { useLocalSearchParams } from "expo-router";
import { CopyIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface RowProps {
  label: string;
  value: string | number | ReactNode;
  className?: string;
}

function DetailRow({ label, value, className }: RowProps) {
  return (
    <View className={cn("flex-row items-center justify-between", className)}>
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="text-foreground font-semibold">{value}</Text>
    </View>
  );
}

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const { getTransactionById } = useTransactions();

  const idStr = Array.isArray(id) ? id[0] : id;
  const transaction = getTransactionById(idStr);

  const handleCopyReferenceId = async () => {
    await copyToClipboard(transaction?.reference_id || "");
  };

  if (!transaction) {
    return (
      <ScreenBoundary className="flex-1 items-center justify-center bg-background">
        <Text className="text-foreground text-lg">Transaction not found.</Text>
      </ScreenBoundary>
    );
  }

  const isDebit = transaction.type === TransactionType.Debit;
  const title = isDebit ? `To ${transaction.to}` : `From ${transaction.from}`;

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <ScreenBoundary className="py-6">
        <View className="items-center py-6 gap-2">
          <View className="flex-row items-baseline">
            <View className="flex-row items-center gap-2">
              <MaskedValue 
                amount={transaction.amount}
                prefix={isDebit ? "-" : "+"}
                className="text-5xl font-bold"
              />
              <MaskedValueToggle size={20} className="size-10" />
            </View>
          </View>
          <Text className="text-xl text-center text-foreground font-semibold">
            {title}
          </Text>
          <Text className="text-muted-foreground text-center">
            {formatDate(transaction.date)}
          </Text>
        </View>
        <Spacer size="xl" />
        <ViewCard className="gap-2.5">
          <DetailRow
            label="Status"
            value={<StatusBadge status={transaction.status} />}
          />
          {isDebit ? (
            <DetailRow
              label="From"
              value={transaction.from}
            />
          ): (
            <DetailRow
              label="To"
              value={transaction.to}
            />
          )}
          <DetailRow
            label="Transaction type"
            value={<Text className="capitalize text-foreground">{transaction.transaction_type}</Text>}
          />
          <DetailRow
            label="Reference ID"
            value={
              <View className="flex-row items-center gap-1">
                <TouchableOpacity
                  onPress={handleCopyReferenceId}
                  accessibilityRole="button"
                  accessibilityLabel="Copy Transaction ID"
                  className="p-1"
                >
                  <CopyIcon size={12} color="blue" />
                </TouchableOpacity>
                <Text className="text-foreground font-semibold">
                  {transaction.reference_id}
                </Text>
              </View>
            }
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
      </ScreenBoundary>
    </ScrollView>
  );
}