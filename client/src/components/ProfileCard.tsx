import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "./Functions";
import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const { user, getProfile, logOut, isLoggedIn } = useContext(AuthContext);
  const navigateTo = useNavigate();


  const handleLogOut = () => {
    logOut();
    navigateTo("/");
  };
  console.log("user in PROFILE :>> ", user);

  useEffect(() => {}, [getProfile]);

  return (
    <div>
      <div className="profileColumns">
        <button onClick={handleLogOut}>log out</button>
        <div className="profileColumnLeft">
          <p className="inputKeys">photo:</p>
          <img style={{ width: "50%" }} src={user?.user_image} alt="" />{" "}
        </div>
        <div className="profileColumn">
          <p className="inputKeys">username:{user?.username}</p>
          <p className="inputKeys">email:{user?.email}</p>
          <p className="inputKeys">
            member since:{formatDate(user?.member_since)}
          </p>
          <p className="inputKeys">bio:{user?.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
