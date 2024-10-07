import { useQuery } from "@tanstack/react-query";
import { User } from "../types/ObjectTypes";
import { getHomeInfo } from "./home-service";


export const useHomeInfoQuery = (user: User | null) => {
    return useQuery<any>({
      queryKey: ['fetchHomeInfo'],
      queryFn: async () => {
        if (user) {
          const items = await getHomeInfo(user);
          return items;
        }
        return [];
      },
      enabled: !!user,
    });
  };