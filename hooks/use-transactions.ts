import { useMemo, useCallback } from "react";
import { Transaction } from "@/types";
import { extractDate } from "@/utils/date";
import { useTransactionsContext } from "@/context/transactions-context";

interface GroupedTransactions {
  date: string;
  data: Transaction[];
}

export function useTransactions() {
  const {
    transactionHistory,
    setTransactionHistory,
    currentBalance,
    setCurrentBalance,
  } = useTransactionsContext();

  const groupedTransactions: GroupedTransactions[] = useMemo(() => {
    // Group transactions by just date (YYYY-MM-DD), filter out those where isMock is true
    const grouped: Record<string, Transaction[]> = {};
    transactionHistory.forEach(tx => {
      if (tx.isMock === true) return;
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
    setTransactionHistory,
    currentBalance,
    setCurrentBalance,
    getTransactionById,
  };
}