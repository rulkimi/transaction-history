import React, { createContext, useContext, useMemo, useState } from "react";
import transactions from "@/constants/transactions.json";
import type { Transaction } from "@/types";

interface TransactionsContextValue {
	transactionHistory: Transaction[];
	setTransactionHistory: React.Dispatch<React.SetStateAction<Transaction[]>>;
	currentBalance: number;
	setCurrentBalance: React.Dispatch<React.SetStateAction<number>>;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    transactions.history as Transaction[]
  );
	const [currentBalance, setCurrentBalance] = useState<number>(
		transactions.current_balance
	);

	const value = useMemo(
		() => ({
			transactionHistory,
			setTransactionHistory,
			currentBalance,
			setCurrentBalance,
		}),
		[transactionHistory, currentBalance]
	);

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error("useTransactionsContext must be used within a TransactionsProvider");
  }
  return ctx;
}

