import fetcher from "@/libs/fetcher";
import { Movie } from "@prisma/client";
import useSWR from "swr";

const useFavorites = () => {
  const {
    data: favorites,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/favorites", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { favorites: favorites as Movie[] | null, error, isLoading, mutate };
};

export default useFavorites;
