import {
  createContext,
  useContext,
  useState,
} from "react";

import type {
  User,
  AuthContextType,
} from "../types/auth.types";

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedUser =
  localStorage.getItem("user");

  const [user, setUser] =
  useState<User | null>(
    storedUser
      ? JSON.parse(storedUser)
      : null
  );
  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );



  const login = (
    token: string,
    user: User
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};