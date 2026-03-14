export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  transaction_type: string; 
  status: "Success" | "Failed" | "Reversed";
  from: string;
  to: string;
  reference_id: string;
}