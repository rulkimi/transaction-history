export interface Transaction {
  id: string;
  amount: number;
  date: string;
  recipient_reference: string | null;
  payment_details?: string | null;
  type: "debit" | "credit";
  transaction_type: string; 
  status: "Completed" | "Failed";
  from: string;
  to: string;
  reference_id: string;
  failed_reason?: string;
}