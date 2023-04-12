import React, { createContext, useState, useEffect } from 'react';
import { AuthRequest, AuthResult } from 'api/auth';
import { BASE_URL } from 'api/const';

interface AuthContextType {
  token: string | null;
  login: (args: AuthRequest) => Promise<AuthResult>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {
    return 'fail';
  },
  logout: () => {},
});

const initialToken = localStorage.getItem('token');

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(initialToken);

  const login: (args: AuthRequest) => Promise<AuthResult> = async (args) => {
    const loginRes = await fetch(`${BASE_URL}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    const loginData = await loginRes.json();
    if (loginRes.ok) {
      setToken(loginData.access_token);
      localStorage.setItem('token', loginData.access_token);
    }

    return loginRes.ok ? 'success' : 'fail';
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // 임의로 token을 지웠을 때 token 값 null로 바꾸기
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        event.key === 'token' &&
        !event.newValue
      ) {
        setToken(null);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
