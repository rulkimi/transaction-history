import { useMemo, useCallback } from "react";
import transactions from "@/constants/transactions.json";
import { Transaction } from "@/types";
import { extractDate } from "@/utils/date";

interface GroupedTransactions {
  date: string;
  data: Transaction[];
}

export function useTransactions() {
  const transactionHistory = transactions.history as Transaction[];

  const groupedTransactions: GroupedTransactions[] = useMemo(() => {
    // Group transactions by just date (YYYY-MM-DD)
    const grouped: Record<string, Transaction[]> = {};
    transactionHistory.forEach(tx => {
      const justDate = extractDate(tx.date);
      if (!grouped[justDate]) grouped[justDate] = [];
      grouped[justDate].push(tx);
    });

    const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    return sortedDates.map(date => ({
      date,
      data: grouped[date]
    }));
  }, [transactionHistory]);

  const getTransactionById = useCallback(
    (id: string) => transactionHistory.find(tx => tx.id === id),
    [transactionHistory]
  );

  return {
    groupedTransactions,
    transactionHistory,
    getTransactionById,
  };
}