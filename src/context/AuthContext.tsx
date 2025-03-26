import { createContext, ReactNode, useState } from "react";
import { User } from "../@types";

// 4 define type for the context
type AuthContextType = {
  user: User | null;
  login: () => void;
};

// 6 define type for providers props
type AuthContextProviderProps = {
  children: ReactNode;
};

// 5 create objext with initial value for the variables/functions we want to share
const AuthContextInitValue: AuthContextType = {
  user: null,
  login: () => {
    throw new Error("Context not initialized");
  },
};

//  1 create context

export const AuthContext = createContext<AuthContextType>(AuthContextInitValue);

// 2 create context provider (warehouse/storage)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const currentUser = {
    userName: "Max",
    email: "max@cab.com",
  };

  // 3 everything i want to share

  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser(currentUser);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
