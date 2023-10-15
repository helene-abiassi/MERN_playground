import { useState } from "react";

function NavBar() {
  const [user, setUser] = useState(false);

  console.log("setUser :>> ", setUser);

  return (
    <>
      <nav>
        <div className="navLeft">
          <img
            className="mainLogo"
            src="https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697317643/voyageApp/logo-variations-02_uffxcy.png"
            alt="voyage-logo"
          />
        </div>
        <div className="navMiddle">
          <a href="/experiences">experiences</a>
          <span> | </span>
          <a href="/map">map</a>
          <span> | </span>
          <a href="/about">about</a>
          <span> | </span>
        </div>

        <div className="navRight">
          {user ? (
            <a href="profile">Profile</a>
          ) : (
            <>
              <a href="/login">login</a>
              <span> | </span>
              <a href="/signup">sign up</a>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
