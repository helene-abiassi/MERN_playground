import { Link } from "react-router-dom";
import { Experience } from "../types/customTypes";
import { useContext, useEffect } from "react";
import { formatDate } from "./Functions";
import { AuthContext } from "../context/AuthContext";

export interface ExperienceCardProp {
  experience: Experience | Experience[];
}

function ExpCards({ experience }: ExperienceCardProp) {
  const { author, title, caption, publication_date, photo, bookmarked_by } =
    experience as Experience;

  const { user } = useContext(AuthContext);

  useEffect(() => {}, [user, experience]);

  return (
    <div>
      <div className="storyCards">
        <div className="storyCardSignle">
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
    </div>
  );
}

export default ExpCards;
