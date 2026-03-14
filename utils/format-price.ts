export const formatPrice = (amount: number, currency: string = "MYR") => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency,
    minimumFractionDigits: 2
  }).format(amount);
}