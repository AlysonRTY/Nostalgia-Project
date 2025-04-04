import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // If user is logging out
  if (location.state?.fromLogout) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return (
      <Navigate
        to="/loginrequired"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;
