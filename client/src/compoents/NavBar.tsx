import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [user, setUser] = useState(false);

  console.log("setUser :>> ", setUser);

  return (
    <>
      <nav>
        <div className="navLeft">
          <NavLink to="/">
            <img
              className="mainLogo"
              src="https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697317643/voyageApp/logo-variations-02_uffxcy.png"
              alt="voyage-logo"
            />
          </NavLink>
        </div>
        <div className="navMiddle">
          <NavLink to="/experiences">experiences</NavLink>
          <span> | </span>
          <NavLink to="/map">map</NavLink>
          <span> | </span>
          <NavLink to="/about">about</NavLink>
          <span> | </span>
        </div>

        <div className="navRight">
          {user ? (
            <NavLink to="/profile">profile</NavLink>
          ) : (
            <>
              <NavLink to="/login">login</NavLink>
              <span> | </span>
              <NavLink to="/signup">sign up</NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
