export const getCurrencySymbol = (currencyCode: string) => {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value || currencyCode
  );
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    // Use 0 decimal places if you don't need cents (e.g., $4,000 instead of $4,000.00)
    maximumFractionDigits: 0,
  }).format(amount);
};
