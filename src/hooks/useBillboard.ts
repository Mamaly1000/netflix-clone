import fetcher from "@/libs/fetcher";
import { Movie } from "@prisma/client";
import useSWR from "swr";

const useBillboard = () => {
  const {
    data: billboard,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { billboard: billboard as Movie | null, error, mutate, isLoading };
};

export default useBillboard;
