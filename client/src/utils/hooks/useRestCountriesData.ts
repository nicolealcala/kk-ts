import React from "react";

type RawCountry = {
  name: { common: string };
  currencies?: Record<string, { name: string; symbol: string }>;
};

export type CurrencyOption = {
  code: string; 
  symbol: string; 
};

export default function useRestCountriesData(
  queries: string[] = ["name", "currencies"],
) {
  const [countries, setCountries] = React.useState<string[]>([]);
  const [currencies, setCurrencies] = React.useState<CurrencyOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const queryString = queries.join(",");

  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/all?fields=${queryString}`,
        );
        if (!response.ok) throw new Error("Network response was not okay");

        const data: RawCountry[] = await response.json();

        // Use Object.entries to get the ISO code [key, value]
        const allCurrencies = data.flatMap((c) =>
          c.currencies ? Object.entries(c.currencies) : [],
        );

        const currencyList: CurrencyOption[] = allCurrencies
          .reduce((acc: CurrencyOption[], [code, details]) => {
            // Check for duplicate based on the ISO code now
            const isDuplicate = acc.find((item) => item.code === code);

            if (!isDuplicate) {
              acc.push({
                code: code, // This is the key (e.g., "PHP")
                symbol: details.symbol || "",
              });
            }
            return acc;
          }, [])
          .sort((a, b) => a.code.localeCompare(b.code)); // Sort by ISO code

        setCurrencies(currencyList);

        // Extract common names and sort alphabetically
        const names = data
          .map((c: RawCountry) => c.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));

        setCountries(names);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [queryString]);

  return { countries, currencies, isLoading };
}
