import { Link } from "react-router-dom";
import { Experience } from "../types/customTypes";
import { useEffect } from "react";
import { formatDate } from "./Functions";

export interface ExperienceCardProp {
  experience: Experience | Experience[];
}

function ExpCards({ experience }: ExperienceCardProp) {
  const { _id, author, title, publication_date, photo } =
    experience as Experience;

  useEffect(() => {}, [experience]);

  return (
    <div>
      <img src={photo} style={{ width: "20%" }} />
      <h4>{title}</h4>
      <p>
        written by {author.username}, {formatDate(publication_date)}
      </p>
      <Link to={`${title}`} state={{ experience: experience }}>
        View More!!
      </Link>
    </div>
  );
}

export default ExpCards;
