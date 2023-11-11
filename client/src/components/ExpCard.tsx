import { Link, useNavigate } from "react-router-dom";
import { Experience } from "../types/customTypes";
import { useContext, useEffect, useState } from "react";
import { formatDate } from "./Functions";
import { AuthContext } from "../context/AuthContext";
import { ExperiencesContext } from "../context/ExperiencesContext";

export interface ExperienceCardProp {
  experience: Experience | Experience[];
}

function ExpCards({ experience }: ExperienceCardProp) {
  const {
    _id,
    author,
    title,
    caption,
    publication_date,
    photo,
    bookmarked_by,
    experienceType,
  } = experience as Experience;

  const { user } = useContext(AuthContext);
  const {
    deleteExperience,
    bookmarkExperience,
    fetchExperiences,
    removeBookmark,
  } = useContext(ExperiencesContext);

  const isBookmarkedInitially =
    user && user.bookmarks.some((bookmark) => bookmark._id === _id);
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitially);
  console.log("isBookmarked :>> ", isBookmarked);

  const navigateTo = useNavigate();

  const handleDeleteExperience = async (experienceID: string) => {
    deleteExperience(experienceID);
    navigateTo("/experiences");
  };

  const handleBookmarkExperience = async (experienceID: string) => {
    bookmarkExperience(experienceID);
    fetchExperiences();
  };

  const handleremoveBookmark = async (experienceID: string) => {
    removeBookmark(experienceID);
    fetchExperiences();
  };

  const handleBookmarkClick = (experienceID: string) => {
    if (!user) {
      alert("You need to log in first!");
      return;
    }
    if (isBookmarked) {
      handleremoveBookmark(experienceID);
      alert("Removed from bookmarks!"); //!Replace with toast ++ just color change
    } else {
      handleBookmarkExperience(experienceID);
      alert("Added to bookmarks!"); //!Replace with toast ++ just color change
    }
    fetchExperiences();
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {}, [user, experience]);

  return (
    <div>
      <div className="storyCards">
        <div className="storyCardSignle">
          <div className="textBox">
            <button
              onClick={() => {
                handleBookmarkClick(_id);
              }}
              style={{
                fontSize: "16px",
                backgroundColor: isBookmarked ? "black" : "white",
                color: isBookmarked ? "white" : "black",
              }}
            >
              {isBookmarked ? (
                <i className="fa fa-bookmark"></i>
              ) : (
                <i className="fa fa-bookmark-o"></i>
              )}
            </button>
            <p>{bookmarked_by.length}</p>
            {user?.email === experience.author.email && (
              <button
                onClick={() => {
                  handleDeleteExperience(_id);
                }}
              >
                Delete
              </button>
            )}{" "}
            {user?.email === experience.author.email && (
              <Link
                style={{ backgroundColor: "black" }}
                to={`/updateexperience/${_id}`}
              >
                Edit
              </Link>
            )}{" "}
            <h2>{title}</h2>
            <div>
              <img className="gridPhoto" src={photo} />
            </div>
            <p className="storyCardCaption">{caption}</p>
            <p>
              written by {author?.username}, {formatDate(publication_date)}
            </p>
            <p>Type: {experienceType}</p>
            <Link
              to={`${title}`}
              state={{
                experience: experience,
              }}
            >
              View More!!
            </Link>
          </div>
        </div>
        <br />
      </div>{" "}
    </div>
  );
}

export default ExpCards;
