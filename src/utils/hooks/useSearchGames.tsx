import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { env } from "env/client.mjs";
import { RawgGame } from "utils/types";

const useSearchGames = (searchQuery: string) => {
  return useQuery({
    queryKey: ["game", "search", searchQuery],
    queryFn({ signal }) {
      return axios
        .get<{ results: RawgGame[] }>(`${env.NEXT_PUBLIC_RAWG_BASEURL}/games`, {
          params: {
            key: env.NEXT_PUBLIC_RAWG_KEY,
            search: searchQuery,
            page_size: 15,
          },
          signal,
        })
        .then((res) => res.data.results);
    },
    enabled: !!searchQuery,
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true,
  });
};

export default useSearchGames;
