import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";
// import { isUserAuth } from "../utilities/isUserAuth.js";
// import { useIsAuth } from "../hooks/useIsAuth.js";

interface ProtectedRouteProp {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const { isLoading, user } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : user ? (
        children
      ) : (
        <h1>not allowed here</h1> // add button to redirect
      )}
    </>
  );
}

export default ProtectedRoute;
