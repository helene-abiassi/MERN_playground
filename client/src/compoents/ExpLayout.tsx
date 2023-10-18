import { Link, NavLink, Outlet } from "react-router-dom";

function ExpLayout() {
  return (
    <div>
      <h1>experiences</h1>
      <nav>
        <NavLink to={"all"}>all</NavLink> <span> | </span>
        <NavLink to={"hiking"}>hiking</NavLink> <span> | </span>
        <NavLink to={"wildlife"}>wildlife</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default ExpLayout;
