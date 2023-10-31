import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { isUserAuth } from "../utilities/isUserAuth.js";
import { useIsAuth } from "../hooks/useIsAuth.js";

interface ProtectedRouteProp {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const allowAccess = useIsAuth();

  return (
    <>
      {isLoading ? (
        <h1>...is Loading</h1>
      ) : allowAccess ? (
        children
      ) : (
        <h1>not allowed here</h1>
      )}
    </>
  );
}

export default ProtectedRoute;
