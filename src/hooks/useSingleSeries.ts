import fetcher from "@/libs/fetcher";
import React from "react";
import useSWR from "swr";

const useSingleSeries = (seriesId?: string) => {
  const url = seriesId ? `/api/series/${seriesId}` : null;
  const {
    data: series,
    error,
    isLoading,
    mutate,
  } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  return { series, error, isLoading, mutate };
};

export default useSingleSeries;
