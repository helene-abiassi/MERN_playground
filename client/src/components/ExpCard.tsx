import { Link, useNavigate } from "react-router-dom";
import { Experience } from "../types/customTypes";
import { useContext, useEffect } from "react";
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
  } = experience as Experience;

  const { user } = useContext(AuthContext);
  const { deleteExperience, bookmarkExperience } =
    useContext(ExperiencesContext);

  const navigateTo = useNavigate();

  const handleDeleteExperience = async (experienceID: string) => {
    deleteExperience(experienceID);
    navigateTo("/experiences");
  };

  const handleBookmarkExperience = async (experienceID: string) => {
    bookmarkExperience(experienceID);
    alert("Added to bookmarks!"); //!Replace with toast or just color change
  };

  useEffect(() => {}, [user, experience]);

  return (
    <div>
      <div className="storyCards">
        <div className="storyCardSignle">
          <div className="textBox">
            <button
              onClick={() => {
                handleBookmarkExperience(_id);
              }}
            >
              Bookmark
            </button>
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
              <Link style={{ backgroundColor: "black" }} to={`/update/${_id}`}>
                Edit
              </Link>
            )}{" "}
            <h2>{title}</h2>
            <div>
              <img className="gridPhoto" src={photo} />
            </div>
            <p>Bookmarks: {experience.bookmarked_by.length}</p>
            <p className="storyCardCaption">{caption}</p>
            <p>
              written by {author?.username}, {formatDate(publication_date)}
            </p>
            <Link to={`${title}`} state={{ experience: experience }}>
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
