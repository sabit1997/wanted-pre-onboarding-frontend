import { AuthRequest, login } from 'api/auth';
import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (args: AuthRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
});

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginHandler = async (args: AuthRequest) => {
    await login(args);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: loginHandler, logout: logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
