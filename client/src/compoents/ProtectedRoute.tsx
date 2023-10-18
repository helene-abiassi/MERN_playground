import { ReactNode, useState } from "react";

interface ProtectedRouteProp {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const [user, setUser] = useState(true);

  return <>{user ? children : <h1>not allowed here</h1>}</>;
}

export default ProtectedRoute;
