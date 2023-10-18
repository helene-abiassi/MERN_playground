import { Link, Navigate, useNavigate, useRouteError } from "react-router-dom";
import { RouteErrorType } from "../types/customTypes";

function ErrorPage() {
  const error = useRouteError() as RouteErrorType;

  const navigateTo = useNavigate();
  const goHome = () => {
    navigateTo("/");
  };

  return (
    <div>
      <h1>nothing to see here</h1>
      <p>{error.error?.message}</p>

      <button onClick={goHome}>go back home</button>
    </div>
  );
}

export default ErrorPage;
