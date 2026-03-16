import { Transaction } from "@/types";

const BASE_MOCK: Omit<Transaction, "id" | "reference_id"> & {
	id: string;
	reference_id: string;
} = {
	id: "mock-pull-to-refresh",
	amount: 57.35,
	date: "2026-03-13T12:00:00",
	type: "credit",
	transaction_type: "Simulated Refresh",
	status: "Completed",
	from: "Pull to Refresh",
	to: "Main Account",
	reference_id: "TRX-MOCKREFRESH1",
	recipient_reference: "New transaction from Pull to Refresh",
};

let mockCounter = 0;

export function getMockPullToRefreshTransaction(): Transaction {
	mockCounter += 1;

	return {
		...BASE_MOCK,
		id: `${BASE_MOCK.id}-${mockCounter}`,
		reference_id: `${BASE_MOCK.reference_id}-${mockCounter}`,
	};
}

