import { createContext, useState, useEffect, useContext } from "react";

import { AuthResponse } from "@/types";

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

const getInitialAuth = (): { user: UserState | null; token: string | null } => {
  const token = localStorage.getItem("accessToken");
  const userJson = localStorage.getItem("user");
  let user: UserState | null = null;

  if (token && userJson) {
    try {
      user = JSON.parse(userJson) as UserState;
    } catch (e) {
      console.error("Lỗi khi parse user từ localStorage", e);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  }

  return { user, token };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserState | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { user: initialUser } = getInitialAuth();

    if (initialUser) {
      setUser(initialUser);
      setIsLoggedIn(true);
    }
  }, []);

  const setAuthData = (data: AuthResponse) => {
    localStorage.setItem("accessToken", data.token);
    const userData: UserState = { username: data.username, role: data.role };

    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  const contextValue: AuthContextType = {
    user,
    isLoggedIn,
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
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }

  return context;
};
