import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);

  const isUserLoggedIn = user ? true : false;
  return (
    <div>
      {isUserLoggedIn ? children : <Navigate to="/loginrequired" replace />}
    </div>
  );
}

export default ProtectedRoute;
