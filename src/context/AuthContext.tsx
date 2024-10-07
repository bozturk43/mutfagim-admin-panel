import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { httpPost } from '../services/httpService';
import { User } from '../types/ObjectTypes';


type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Login fonksiyonu
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await httpPost('/auth', credentials);
      if (!response.success) {
        throw new Error('Giriş başarısız');
      }
      return response.data; // Kullanıcı bilgisini döndürüyoruz
    },
    onSuccess: (data:any) => {
      const userData:User = {
        id:data.user.id,
        name:data.user.name,
        email:data.user.email,
        token:data.token
      } 
      setUser(userData); // Kullanıcı bilgilerini state'e ayarlıyoruz
      localStorage.setItem('user', JSON.stringify(userData)); // Kullanıcıyı localStorage'a kaydediyoruz
    },
    onError: (error: any) => {
      console.error(error.message); // Hata durumunda hata mesajını logluyoruz
    },
  });

  // Login fonksiyonunu doğru bir şekilde dönüştürmek için
  const login: (email: string, password: string) => Promise<void> = async (email, password) => {
    await loginMutation.mutateAsync({ email, password });
  };

  // Logout fonksiyonu
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    queryClient.clear(); // Tüm cache'i temizler
  };

  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    checkUserSession();
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
