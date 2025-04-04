import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../lib/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { LoadingSpinner } from "../components/LoadingSpinner";

// 4 define type for the context
type AuthContextType = {
  user: User | null;
  userData: any; // userData to store additional user info
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
};

// 6 define type for providers props
type AuthContextProviderProps = {
  children: ReactNode;
};

// 5 create objext with initial value for the variables/functions we want to share
const AuthContextInitValue: AuthContextType = {
  user: null,
  userData: null,
  login: () => {
    throw new Error("Context not initialized");
  },
  register: () => {
    throw new Error("Context not initialized");
  },
  logout: () => {
    throw new Error("Context not initialized");
  },
  checkUsernameAvailability: () => {
    throw new Error("Context not initialized");
  },
};

//  1 create context
export const AuthContext = createContext<AuthContextType>(AuthContextInitValue);

// 2 create context provider (warehouse/storage)
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // 3 everything i want to share
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null); // Store additional user data
  const [loading, setLoading] = useState(true);

  const checkUsernameAvailability = async (username: string) => {
    try {
      const usernameDoc = await getDoc(doc(db, "usernames", username));
      return !usernameDoc.exists();
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      //  check if username is available
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        throw new Error("Username is already taken");
      }

      // Create the auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
        createdAt: new Date(),
      });

      // Reserve  username
      await setDoc(doc(db, "usernames", username), {
        userId: user.uid,
      });

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null); // Clear user data on logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
      setUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        login,
        logout,
        register,
        checkUsernameAvailability,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
