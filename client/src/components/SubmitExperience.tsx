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
}

export interface ExperienceImage {
  userImage: string;
  photo_body: string | string[];
}

function SubmitExperience() {
  const [displayPhoto, setDisplayPhoto] = useState<File | string>("");
  const [photoAlbum, setPhotoAlbum] = useState<File[] | string[]>([]);

  const [newExperience, setNewExperience] = useState({
    author: {
      _id: "652ad65dfef8bfeece28f7cb",
      username: "",
      email: "bobolechien@test.com",
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
    photo_body: [""],
  });

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
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

  const handleTypeInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewExperience({ ...newExperience, experienceType: e.target.value });
  };

  const handlePhotoInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e);
    setDisplayPhoto(e.target.files?.[0] || "");
  };

  const handleDisplayPhotoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("photo", displayPhoto);
    console.log("formdata :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/experiences/mainphotoupload",
        requestOptions
      );
      const result = (await response.json()) as ExperienceImage;
      // console.log("result :>> ", result);

      setNewExperience({ ...newExperience, photo: result.userImage });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handlePhotoAlbumInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const photoArray: File[] = [];
      for (let i = 0; i < files.length; i++) {
        photoArray.push(files[i]);
      }
      console.log("photoArray :>> ", photoArray);
      setPhotoAlbum(photoArray);
    }
  };

  const handlePhotoAlbumSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    for (let i = 0; i < photoAlbum.length; i++) {
      formdata.append("photo_body", photoAlbum[i]);
    }

    console.log("formdata :>> ", formdata);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/experiences/photoalbumuploady",
        requestOptions
      );

      const result = await response.json();
      console.log("result album photo:>> ", result);
      setNewExperience({ ...newExperience, photo_body: result.photo_urls });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleSubmitExperience = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const photoBodyJSON = JSON.stringify(newExperience.photo_body);

    const urlencoded = new URLSearchParams();
    urlencoded.append("_id", newExperience.author._id);
    urlencoded.append("email", newExperience.author.email);
    urlencoded.append("title", newExperience.title);
    urlencoded.append("caption", newExperience.caption);
    urlencoded.append("photo", newExperience.photo);
    urlencoded.append("country", newExperience.location.country);
    urlencoded.append("city", newExperience.location.city);
    urlencoded.append("longitude", newExperience.location.latitude);
    urlencoded.append("latitude", newExperience.location.longitude);
    urlencoded.append("experienceType", newExperience.experienceType);
    urlencoded.append("text_body", newExperience.text_body);
    urlencoded.append("photo_body", photoBodyJSON);

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
    alert("yey!"); //!Replace with modal/toast ++ redirect to story page
  };

  useEffect(() => {
    setNewExperience(newExperience);
  }, []);

  //Do delete + edit experience (not sure where// show in grid and details)
  return (
    <div>
      <div className="inputColorBox">
        <form onSubmit={handleDisplayPhotoSubmit}>
          photo
          <input onChange={handlePhotoInput} name="photo" type="file" />
          <button type="submit">upload</button>
        </form>
        <br />
        <form onSubmit={handlePhotoAlbumSubmit}>
          photo album:
          <input
            onChange={handlePhotoAlbumInput}
            multiple
            name="photo_body"
            type="file"
          />
          <button type="submit">upload</button>
          <figcaption>*you can upload up to 4 photos</figcaption>
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
          <input onChange={handleLocationInput} name="country" type="text" />
          <br />
          <br />
          <label htmlFor="city">city:</label>
          <input onChange={handleLocationInput} name="city" type="text" />
          <br />
          <br />
          <label htmlFor="longitude">longitude:</label>
          <input onChange={handleLocationInput} name="longitude" type="text" />
          <br />
          <br />
          <label htmlFor="latitude">latitude:</label>
          <input onChange={handleLocationInput} name="latitude" type="text" />
          <br />
          <br />
          <label htmlFor="experienceType">experience type:</label>
          <select
            onChange={handleTypeInput}
            id="experienceType"
            name="experienceType"
            value={newExperience.experienceType}
          >
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
          <button className="formButton" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitExperience;
