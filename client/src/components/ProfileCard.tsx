import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "./Functions";
import { Link, useNavigate } from "react-router-dom";

function ProfileCard() {
  const { user, getProfile, logOut, isLoggedIn, deleteProfile } =
    useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleDeleteProfile = (userID: string) => {
    window.confirm("Are you SURE you want to delete your profile?");

    deleteProfile(userID);
    navigateTo("/");
  };

  const handleLogOut = () => {
    window.confirm("Are you SURE you want to log out?");

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
        <Link
          style={{ backgroundColor: "black" }}
          to={`/updateprofile/${user!._id}`}
        >
          Edit
        </Link>
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
          <p>Bookmarks:</p>
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
                  <p>by {bookmark.author.username}</p>
                  <p>
                    {bookmark.location.country}, {bookmark.location.city}
                  </p>
                </div>
              );
            })}
          <p>Submissions:</p>
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
                  <p>by you</p>
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
