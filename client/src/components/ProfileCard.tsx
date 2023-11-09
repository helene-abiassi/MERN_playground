import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "./Functions";
import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const { user, getProfile, logOut, isLoggedIn, deleteProfile } =
    useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleDeleteProfile = (userID: string) => {
    deleteProfile(userID);
    navigateTo("/");
  };

  const updateProfile = () => {
  };
  const handleLogOut = () => {
    logOut();
    navigateTo("/");
  };
  console.log("user in PROFILE :>> ", user);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <div className="profileColumns">
        <button onClick={handleLogOut}>log out</button>
        <button
          onClick={() => {
            handleDeleteProfile(user!._id);
          }}
        >
          Delete
        </button>
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
          <p>Bookmarks: {user?.bookmarks.length}</p>
          {user?.bookmarks &&
            user.bookmarks.map((bookmark, bookInd) => {
              return (
                <div key={bookInd}>
                  <img
                    style={{ width: "10%" }}
                    src={bookmark.photo}
                    alt={bookmark.title}
                  />
                  <p>{bookmark.title}</p>
                  <p>{bookmark.publication_date}</p>
                  <p>
                    {bookmark.location.country}, {bookmark.location.city}
                  </p>
                </div>
              );
            })}
          <p>Submissions: {user?.submissions.length}</p>
          {/* //!Add conditional rendering for length<0, no submissions posted yet */}
          {user?.submissions &&
            user.submissions.map((submission, submInd) => {
              return (
                <div key={submInd}>
                  <img
                    style={{ width: "10%" }}
                    src={submission.photo}
                    alt={submission.title}
                  />
                  <p>{submission.title}</p>
                  <p>{submission.publication_date}</p>
                  <p>
                    {submission.location.country}, {submission.location.city}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
