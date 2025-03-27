import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);

  const isUserLoggedIn = user ? true : false;
  return <div>{isUserLoggedIn ? children : <h1>log in first</h1>}</div>;

  //   if (!user) {
  //     return <Navigate to="/login" replace />;
  //   }

  return <>{children}</>;
}

export default ProtectedRoute;
