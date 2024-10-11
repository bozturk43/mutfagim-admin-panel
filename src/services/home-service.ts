import { User } from "../types/ObjectTypes";
import { httpGet, httpPost } from "./httpService";

export const getHomeInfo = async (user: User): Promise<any[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,

      },
    };
    const response = await httpGet('admin/home-info', config);
    if (response.success) {
      return response.data.collections || [];
    } else {
      return [];
    }
  };
  export const getAllLovs = async (user: User): Promise<any[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,

      },
    };
    const response = await httpGet('lovs/get-lovs', config);
    if (response.success) {
      return response.data || [];
    } else {
      return [];
    }
  };
  export const updateProduct = async (user: User,updateData:any): Promise<any[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,

      },
    };
    const response = await httpPost('admin/update-product', updateData,config);
    if (response.success) {
      return response.data || [];
    } else {
      return [];
    }
  };
  