import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../styles/Home.css";
import "../styles/Experiences.css";

export interface Experience extends ExperienceImage {
  author: {
    _id: string;
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
    longitude: string;
    latitude: string;
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
      _id: "652ad65dfef8bfeece28f7cb",
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
      longitude: "",
      latitude: "",
    },
    experienceType: "", //Change it to a dropdown selection
    text_body: "",
    // photo_body: "",
  });

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({
      ...newExperience,
      location: {
        ...newExperience.location,
        [name]: value,
      },
    });
  };

  const handleSubmitExperience = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("_id", newExperience.author._id);
    urlencoded.append("email", newExperience.author.email);
    urlencoded.append("title", newExperience.title);
    urlencoded.append("caption", newExperience.caption);
    urlencoded.append("photo", newExperience.photo);
    urlencoded.append("experienceType", newExperience.experienceType);
    urlencoded.append("text_body", newExperience.text_body);
    urlencoded.append("country", newExperience.location.country);
    urlencoded.append("city", newExperience.location.city);
    urlencoded.append("longitude", newExperience.location.latitude);
    urlencoded.append("latitude", newExperience.location.longitude);
    console.log("location :>> ", newExperience.location);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/experiences/experiencesubmission",
        requestOptions
      );
      const results = await response.json();
      console.log("results :>> ", results);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    setNewExperience(newExperience);
  }, []);

  return (
    <div>
      <div className="inputColorBox">
        <form action="">
          photo
          <input type="file" />
          <button>upload</button>
        </form>
        <br />
        <form onSubmit={handleSubmitExperience}>
          <br />
          <label htmlFor="title">title:</label>
          <input onChange={handleFormInput} name="title" type="text" />
          <br />
          <br />
          <label htmlFor="caption">caption:</label>
          <input onChange={handleFormInput} name="caption" type="text" />
          <br />
          <br />
          <label htmlFor="country">country:</label>
          <input onChange={handleFormInput} name="country" type="text" />
          <br />
          <br />
          <label htmlFor="city">city:</label>
          <input onChange={handleFormInput} name="city" type="text" />
          <br />
          <br />
          <label htmlFor="longitude">longitude:</label>
          <input onChange={handleFormInput} name="longitude" type="text" />
          <br />
          <br />
          <label htmlFor="latitude">latitude:</label>
          <input onChange={handleFormInput} name="latitude" type="text" />
          <br />
          <br />
          <label htmlFor="experienceType">experience type:</label>
          <select id="experienceType" name="experienceType">
            <option value="search">Search</option>
            <option value="hiking">hiking</option>
            <option value="faunaflora">fauna & flora</option>
            <option value="wildlife">wildlife</option>
          </select>
          <br />
          <br />
          <label htmlFor="story">story:</label>
          <input
            name="text_body"
            onChange={handleFormInput}
            id="textInput"
            type="text"
          />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

export default SubmitExperience;
