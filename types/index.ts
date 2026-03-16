export const ThemeMode = {
	Light: "light",
	Dark: "dark",
} as const;
export type ThemeModeValue = (typeof ThemeMode)[keyof typeof ThemeMode];

export const TransactionType = {
	Debit: "debit",
	Credit: "credit",
} as const;
export type TransactionTypeValue = (typeof TransactionType)[keyof typeof TransactionType];

export const TransactionStatus = {
	Completed: "Completed",
	Failed: "Failed",
} as const;
export type TransactionStatusValue = (typeof TransactionStatus)[keyof typeof TransactionStatus];

export interface Transaction {
	id: string;
	amount: number;
	date: string;
	recipient_reference: string | null;
	payment_details?: string | null;
	type: TransactionTypeValue;
	transaction_type: string;
	status: TransactionStatusValue;
	from: string;
	to: string;
	reference_id: string;
	failed_reason?: string;
}