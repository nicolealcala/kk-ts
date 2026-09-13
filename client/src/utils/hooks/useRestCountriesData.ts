import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 25;

export type CountryOption = {
  countryCode: string;
  country: string;
  state: string;
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
  currencies?: {
    code: string;
    name: string;
    symbol?: string;
  }[];
  flag?: {
    url_svg?: string;
  };
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
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const { data }: RestCountriesResponse = await response.json();

  return data;
};

const fetchCurrencies = async (
  query: string,
  offset: number,
): Promise<RestCountriesResponse["data"]> => {
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
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  const { data }: RestCountriesResponse = await response.json();

  return data;
};

const getNextPageParam = (lastPage: RestCountriesResponse["data"]) => {
  if (!lastPage.meta.more) {
    return undefined;
  }

  return lastPage.meta.offset + lastPage.meta.count;
};

export default function useRestCountriesData(
  locationQuery: string = "",
  currencyQuery: string = "",
) {
  const normalizedLocationQuery = locationQuery.trim();
  const normalizedCurrencyQuery = currencyQuery.trim();

  const countriesQuery = useInfiniteQuery({
    queryKey: ["rest-countries", "countries", normalizedLocationQuery],
    queryFn: ({ pageParam }) =>
      fetchCountries(normalizedLocationQuery, pageParam),
    initialPageParam: 0,
    getNextPageParam,
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

  const countries = React.useMemo(
    () =>
      countriesQuery.data?.pages
        .flatMap((page) => page.objects)
        .filter((country) => country.codes?.alpha_2 && country.names?.common)
        .map((country) => ({
          countryCode: country.codes!.alpha_2!,
          country: country.names!.common!,
          url_svg: country.flag?.url_svg ?? "",
        }))
        .sort((a, b) => a.country.localeCompare(b.country)) ?? [],
    [countriesQuery.data],
  );

  const currencies = React.useMemo(
    () =>
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
        }, [])
        .sort((a, b) => a.code.localeCompare(b.code)) ?? [],
    [currenciesQuery.data],
  );

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
