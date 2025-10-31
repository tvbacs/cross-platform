import { User } from '@/src/types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  updateAuth: (user: User | null, token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('user'),
        ]);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Lỗi khi load auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const updateAuth = (newUser: User | null, newToken: string | null) => {
    setUser(newUser);
    setToken(newToken);

    if (newUser && newToken) {
      AsyncStorage.setItem('token', newToken);
      AsyncStorage.setItem('user', JSON.stringify(newUser));
    } else {
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
