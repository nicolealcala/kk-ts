import * as React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 25;

export type CountryOption = {
  countryCode: string;
  country: string;
  url_svg: string;
};

export type CurrencyOption = {
  code: string;
  symbol: string;
};

type RawCountry = {
  names?: {
    common?: string;
  };
  codes?: {
    alpha_2?: string;
  };
  flag?: {
    url_svg?: string;
  };
};

type RawCurrency = {
  code: string;
  name: string;
  symbol?: string;
};

type RawCurrencyCountry = {
  currencies?: RawCurrency[];
};

type RestCountriesResponse = {
  data: {
    objects: RawCountry[];
    meta: {
      count: number;
      offset: number;
      more: boolean;
    };
  };
};

type CurrencyResponse = {
  data: {
    objects: RawCurrencyCountry[];
    meta: {
      count: number;
      offset: number;
      more: boolean;
    };
  };
};

const getHeaders = () => ({
  Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`,
});

const fetchCountries = async (
  query: string,
  offset: number,
): Promise<RestCountriesResponse["data"]> => {
  const params = new URLSearchParams({
    limit: PAGE_SIZE.toString(),
    offset: offset.toString(),
    response_fields: "names.common,codes.alpha_2,flag.url_svg",
  });

  if (query) {
    params.set("q", query);
  }

  const response = await fetch(
    `https://api.restcountries.com/countries/v5?${params}`,
    { headers: getHeaders() },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const { data }: RestCountriesResponse = await response.json();

  return data;
};

const fetchCountryByCode = async (
  countryCode: string,
): Promise<CountryOption | null> => {
  const params = new URLSearchParams({
    response_fields: "names.common,codes.alpha_2,flag.url_svg",
  });

  params.set("codes.alpha_2", countryCode);

  const response = await fetch(
    `https://api.restcountries.com/countries/v5?${params}`,
    { headers: getHeaders() },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch country");
  }

  const { data }: RestCountriesResponse = await response.json();

  const country = data.objects.find(
    (item) => item.codes?.alpha_2 === countryCode,
  );

  if (!country?.codes?.alpha_2 || !country.names?.common) {
    return null;
  }

  return {
    countryCode: country.codes.alpha_2,
    country: country.names.common,
    url_svg: country.flag?.url_svg ?? "",
  };
};

const fetchCurrencies = async (
  query: string,
  offset: number,
): Promise<CurrencyResponse["data"]> => {
  const params = new URLSearchParams({
    limit: PAGE_SIZE.toString(),
    offset: offset.toString(),
    response_fields: "currencies",
  });

  if (query) {
    params.set("q", query);
  }

  const response = await fetch(
    `https://api.restcountries.com/countries/v5?${params}`,
    { headers: getHeaders() },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  const { data }: CurrencyResponse = await response.json();

  return data;
};

const fetchCurrencyByCode = async (
  currencyCode: string,
): Promise<CurrencyOption | null> => {
  const params = new URLSearchParams({
    response_fields: "currencies",
    "currencies.code": currencyCode.toUpperCase(),
  });

  const response = await fetch(
    `https://api.restcountries.com/countries/v5?${params}`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currency");
  }

  const { data }: CurrencyResponse = await response.json();

  for (const country of data.objects) {
    const currency = country.currencies?.find(
      (currency) => currency.code === currencyCode,
    );

    if (currency) {
      return {
        code: currency.code,
        symbol: currency.symbol ?? "",
      };
    }
  }

  return null;
};

const getNextPageParam = (
  lastPage: RestCountriesResponse["data"] | CurrencyResponse["data"],
) => {
  if (!lastPage.meta.more) {
    return undefined;
  }

  return lastPage.meta.offset + lastPage.meta.count;
};

export default function useRestCountriesData(
  locationQuery = "",
  currencyQuery = "",
  selectedCountryCode?: string | null,
  selectedCurrencyCode?: string | null,
) {
  const normalizedLocationQuery = locationQuery.trim();
  const normalizedCurrencyQuery = currencyQuery.trim();
  const normalizedCountryCode = selectedCountryCode?.toUpperCase();
  const normalizedCurrencyCode = selectedCurrencyCode?.toUpperCase();

  const countriesQuery = useInfiniteQuery({
    queryKey: ["rest-countries", "countries", normalizedLocationQuery],
    queryFn: ({ pageParam }) =>
      fetchCountries(normalizedLocationQuery, pageParam),
    initialPageParam: 0,
    getNextPageParam,
    staleTime: 1000 * 60 * 60,
  });

  const selectedCountryQuery = useQuery({
    queryKey: ["rest-countries", "country", normalizedCountryCode],
    queryFn: () => fetchCountryByCode(normalizedCountryCode!),
    enabled: !!normalizedCountryCode,
    staleTime: 1000 * 60 * 60,
  });

  const currenciesQuery = useInfiniteQuery({
    queryKey: ["rest-countries", "currencies", normalizedCurrencyQuery],
    queryFn: ({ pageParam }) =>
      fetchCurrencies(normalizedCurrencyQuery, pageParam),
    initialPageParam: 0,
    getNextPageParam,
    staleTime: 1000 * 60 * 60,
  });

  const selectedCurrencyQuery = useQuery({
    queryKey: ["rest-countries", "currency", normalizedCurrencyCode],
    queryFn: () => fetchCurrencyByCode(normalizedCurrencyCode!),
    enabled: !!normalizedCurrencyCode,
    staleTime: 1000 * 60 * 60,
  });

  const countries = React.useMemo(() => {
    const results =
      countriesQuery.data?.pages
        .flatMap((page) => page.objects)
        .filter((country) => country.codes?.alpha_2 && country.names?.common)
        .map((country) => ({
          countryCode: country.codes!.alpha_2!,
          country: country.names!.common!,
          url_svg: country.flag?.url_svg ?? "",
        })) ?? [];

    const selectedCountry = selectedCountryQuery.data;

    if (
      selectedCountry &&
      !results.some(
        (country) => country.countryCode === selectedCountry.countryCode,
      )
    ) {
      return [selectedCountry, ...results];
    }

    return results;
  }, [countriesQuery.data, selectedCountryQuery.data]);

  const currencies = React.useMemo(() => {
    const results =
      currenciesQuery.data?.pages
        .flatMap((page) => page.objects)
        .flatMap((country) => country.currencies ?? [])
        .reduce<CurrencyOption[]>((acc, currency) => {
          if (!acc.some((item) => item.code === currency.code)) {
            acc.push({
              code: currency.code,
              symbol: currency.symbol ?? "",
            });
          }

          return acc;
        }, []) ?? [];

    const selectedCurrency = selectedCurrencyQuery.data;

    if (
      selectedCurrency &&
      !results.some((currency) => currency.code === selectedCurrency.code)
    ) {
      return [selectedCurrency, ...results];
    }

    return results.sort((a, b) => a.code.localeCompare(b.code));
  }, [currenciesQuery.data, selectedCurrencyQuery.data]);

  return {
    countries,
    currencies,

    isCountriesLoading: countriesQuery.isPending,
    isFetchingCountriesNextPage: countriesQuery.isFetchingNextPage,
    hasNextCountriesPage: countriesQuery.hasNextPage,
    fetchNextCountriesPage: countriesQuery.fetchNextPage,

    isCurrenciesLoading: currenciesQuery.isPending,
    isFetchingCurrenciesNextPage: currenciesQuery.isFetchingNextPage,
    hasNextCurrenciesPage: currenciesQuery.hasNextPage,
    fetchNextCurrenciesPage: currenciesQuery.fetchNextPage,
  };
}
