import fetcher from "@/libs/fetcher";
import { User } from "@prisma/client";
import useSWR from "swr";

const useCurrentUser = () => {
  const {
    data ,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/current", fetcher);

  return {
    user: data?.user as User,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
