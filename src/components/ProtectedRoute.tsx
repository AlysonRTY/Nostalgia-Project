import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);

  const isUserLoggedIn = user ? true : false;
  return <div>{isUserLoggedIn ? children : <h1>log in first</h1>}</div>;
}

export default ProtectedRoute;
