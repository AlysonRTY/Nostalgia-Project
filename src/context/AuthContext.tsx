import { createContext, ReactNode, useEffect, useState } from "react";
import { app, auth } from "../lib/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
console.log(auth);
// console.log(app);

// need to seperate these
// maybe delte/replace fadeIn
// when logout i on restricted content => to homepage instead of loginrequiredpage

// 4 define type for the context
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
  // 3 everything i want to share

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Wait until auth state is loaded before rendering children
  if (loading) {
    return <div>Loading...</div>; // custom loading component /add later
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
