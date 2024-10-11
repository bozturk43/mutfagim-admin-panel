import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/ObjectTypes";
import { getAllLovs, getHomeInfo, updateProduct } from "./home-service";


export const useHomeInfoQuery = (user: User | null, collectionName?: "produtcs" | "recipes" | "users" | "foodCategories" | "conversationNames") => {
  return useQuery<any>({
    queryKey: [`fetchHomeInfo-${collectionName}`],
    queryFn: async () => {
      console.log("COL NAME", collectionName);
      if (user) {
        const items = await getHomeInfo(user);
        if (collectionName === undefined) {
          return items;
        }
        else {
          const filteredCollection = items.find((item: any) => item.collectionName === collectionName);
          return filteredCollection;
        }
      }
      return [];
    },
    enabled: !!user,
  });
};

export const useAllLovs = (user: User | null) => {
  return useQuery<any>({
    queryKey: [`fetchAllLovs`],
    queryFn: async () => {
      if (user) {
        const items = await getAllLovs(user);
        return items;

      }
      return [];
    },
    enabled: !!user,
  });
};

export const useUpdateProduct = (user:User | null) => {
  const queryClient = useQueryClient(); // QueryClient'i al

  return useMutation({
      mutationFn: async (editedData:any) => {
        console.log("IN MUTATION",editedData)
        if(user){
          const response = await updateProduct(user,editedData); 
          return response;
        }
      },
      onSuccess: (data) => {
          console.log('Güncelleme başarılı:', data);
          queryClient.invalidateQueries({queryKey:['fetchHomeInfo-produtcs']});

          // Başarılı güncelleme sonrası yapılacak işlemler (örneğin bir bildirim göstermek)
      },
      onError: (error) => {
          console.error('Güncelleme hatası:', error);
          // Hata durumunda yapılacak işlemler (örneğin bir hata bildirimi göstermek)
      },
  });
};