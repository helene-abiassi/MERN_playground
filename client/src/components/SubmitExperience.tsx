import { useState } from "react";
import "../styles/Home.css";
import "../styles/Experiences.css";

export interface Experience extends ExperienceImage {
  author: {
    _id: number;
    username: string;
    email: string;
    bio: string;
    member_since: Date;
    user_image: string;
  };
  title: string;
  caption: string;
  publication_date: Date;
  location: {
    country: string;
    city: string;
    longitude: number;
    latitude: number;
  };
  experienceType: string;
  text_body: string;
  //   photo_body: string | string[];
}

export interface ExperienceImage {
  photo: string;
}

function SubmitExperience() {
  const [newExperience, setNewExperience] = useState({
    author: {
      _id: 0,
      username: "",
      email: "",
      bio: "",
      member_since: Date(),
      user_image: "",
    },
    title: "",
    caption: "",
    publication_date: new Date(),
    photo: "",
    location: {
      country: "",
      city: "",
      longitude: 0,
      latitude: 0,
    },
    experienceType: "", //Change it to a dropdown selection
    text_body: "",
    // photo_body: "",
  });

  return (
    <div>
      <div className="inputColorBox">
        <form action="">
          Photo Upload
          <input type="file" />
          <button>upload</button>
        </form>
        <form>
          <label htmlFor="title">Title:</label>
          <input type="text" />
          <br />
          <label htmlFor="caption">Caption:</label>
          <input type="text" />
          <br />
          <label htmlFor="title">country:</label>
          <input type="text" />
          <br />
          <label htmlFor="title">city:</label>
          <input type="text" />
          <br />
          <label htmlFor="title">longitude:</label>
          <input type="text" />
          <br />
          <label htmlFor="title">Title:</label>
          <input type="text" />
          <br />
          <label htmlFor="title">Title:</label>
          <input type="text" />
          <br />
          <label htmlFor="title">Story:</label>
          <input type="text" />
          <br />
          <button>submit</button>
        </form>
      </div>
    </div>
  );
}

export default SubmitExperience;
