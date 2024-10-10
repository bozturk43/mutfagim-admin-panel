import { useQuery } from "@tanstack/react-query";
import { User } from "../types/ObjectTypes";
import { getHomeInfo } from "./home-service";


export const useHomeInfoQuery = (user: User | null,collectionName?:"produtcs" | "recipes" | "users" | "foodCategories" | "conversationNames") => {
    return useQuery<any>({
      queryKey: [`fetchHomeInfo-${collectionName}`],
      queryFn: async () => {
        console.log("COL NAME",collectionName);
        if (user) {
          const items = await getHomeInfo(user);
          if(collectionName === undefined){
            return items;
          }
          else{
            const filteredCollection = items.find((item:any)=>item.collectionName === collectionName);
            return filteredCollection;
          }
        }
        return [];
      },
      enabled: !!user,
    });
  };