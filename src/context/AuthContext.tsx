import { createContext, ReactNode, useState } from "react";
import { app, auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
console.log(auth);

// 4 define type for the context
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
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
  register: () => {
    throw new Error("Context not initialized");
  },
  logout: () => {
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

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setUser(user);
      });
  };

  const register = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
