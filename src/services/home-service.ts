import { User } from "../types/ObjectTypes";
import { httpGet } from "./httpService";

export const getHomeInfo = async (user: User): Promise<any[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,

      },
    };
    const response = await httpGet('home-info', config);
    if (response.success) {
      return response.data.collections || [];
    } else {
      return [];
    }
  };