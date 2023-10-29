import { useEffect, useState } from "react";
import { User } from "../types/customTypes";

function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("you need to log in first!");
      //Redirect user to login/ protected route page
    }
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptions
        );

        if (!response.ok) {
          alert(response.statusText);
        }

        if (response.ok) {
          const result = await response.json();
          console.log("result to get my user profile :>> ", result);
          const user = result.userProfile as User;

          setUser(user);
        }
      } catch (err) {
        const error = err as Error;
        console.log("error :>> ", error.message);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <div className="profileColumns">
        <div className="profileColumnLeft">
          <p className="inputKeys">photo:</p>
          <img style={{ width: "50%" }} src={user?.user_image} alt="" />{" "}
        </div>
        <div className="profileColumn">
          <p className="inputKeys">username:{user?.username}</p>
          <p className="inputKeys">email:{user?.email}</p>
          <p className="inputKeys">member since:{user?.member_since}</p>{" "}
          {/* //!FORMAT DATE */}
          <p className="inputKeys">bio:{user?.bio}</p>
        </div>
        {/* <button onClick={getProfile}>get profile</button> */}
      </div>
    </div>
  );
}

export default ProfileCard;
