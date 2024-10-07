import axios, { AxiosRequestConfig } from 'axios';

// API base URL
const API_URL = 'http://localhost:3000/api/admin/';

// API cevabı için kullanılan şablon
interface ApiResponse {
  success: boolean;
  data: any;
  error?: string;
}

// GET request
export const httpGet = async (url: string, config?: AxiosRequestConfig): Promise<ApiResponse> => {
  const headers = {
    'Content-Type': 'application/json', // İçerik türünü ayarla
    ...(config?.headers || {}), // Var olan başlıkları koru
  };

  try {
    const response = await axios.get(`${API_URL}${url}`,{
      ...config,
      headers
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('GET Error:', error.message);
    return {
      success: false,
      data: {},
      error: error.response?.data?.message || 'An error occurred',
    };
  }
};

// POST request
export const httpPost = async (url: string, body: any, config?: AxiosRequestConfig): Promise<ApiResponse> => {
    const headers = {
        'Content-Type': 'application/json', // İçerik türünü ayarla
        ...(config?.headers || {}), // Var olan başlıkları koru
      };
  try {
    const response = await axios.post(`${API_URL}${url}`, body, {
        ...config, // Mevcut config'i spread ile ekle
        headers, // Yeni başlıkları ekle
      });    
      return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('POST Error:', error.message);
    return {
      success: false,
      data: {},
      error: error.response?.data?.message || 'An error occurred',
    };
  }
};
