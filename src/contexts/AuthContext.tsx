import { createContext, useState, useContext } from 'react';

import { AuthResponse } from '@/types';

export interface UserState {
  username: string;
  role: string;
}

export interface AuthContextType {
  user: UserState | null;
  isLoggedIn: boolean;
  setAuthData: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getPersistedAuth = () => {
  const token = localStorage.getItem('accessToken');
  const userJson = localStorage.getItem('user');

  if (token && userJson) {
    try {
      return {
        user: JSON.parse(userJson) as UserState,
        isLoggedIn: true,
      };
    } catch (_e) {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  }

  return { user: null, isLoggedIn: false };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState(getPersistedAuth());

  const setAuthData = (data: AuthResponse) => {
    localStorage.setItem('accessToken', data.token);
    const userData: UserState = { username: data.username, role: data.role };

    localStorage.setItem('user', JSON.stringify(userData));

    setAuth({
      user: userData,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAuth({ user: null, isLoggedIn: false });
  };

  const contextValue: AuthContextType = {
    user: auth.user,
    isLoggedIn: auth.isLoggedIn,
    setAuthData,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }

  return context;
};
