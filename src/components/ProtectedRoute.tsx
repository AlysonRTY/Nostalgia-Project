import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (location.state?.fromLogout) {
      setIsLoggingOut(true);
    }
  }, [location]);

  if (isLoggingOut) {
    return <Navigate to="/" replace />;
  }

  return user ? children : <Navigate to="/loginrequired" replace />;
}

export default ProtectedRoute;
