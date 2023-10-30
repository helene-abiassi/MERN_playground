import { ReactNode, useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { isUserAuth } from "../utilities/isUserAuth.js";
import { useIsAuth } from "../hooks/useIsAuth.js";

interface ProtectedRouteProp {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {

  const allowAccess = useIsAuth();

  return <>{allowAccess ? children : <h1>not allowed here</h1>}</>;
}

export default ProtectedRoute;
