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

export const formatCurrency = (
  val: number | string | null | undefined,
  currency: string | null | undefined,
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || undefined,
    maximumFractionDigits: 0,
  }).format(Number(val));
};
