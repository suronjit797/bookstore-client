import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return <> {children} </>;
};

export default AuthRoute;
