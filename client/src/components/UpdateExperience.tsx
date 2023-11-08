import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Experience } from "../types/customTypes";

// fields to update in a state
// all fields to update in object, take
// when submit form, you call the function
// pass arguments that you need to update

// pass all the values, and if there's no update, keep and only call the update function for the values that changed

function UpdateExperience() {
  const [existingExperience, setExistingExperience] = useState<Experience>();
  const [updatedExperience, setUpdatedExperience] = useState<Experience>({
    _id: "",
    author: {
      a_id: "",
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
    experienceType: "",
    text_body: "",
    photo_body: [""],
    comments: [],
  });
  const [updatedPhoto, setUpdatedPhoto] = useState<File | string>("");

  const { experienceId } = useParams();
  console.log("experienceId :>> ", experienceId);

  const navigateTo = useNavigate();

  const fetchExistingData = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `http://localhost:5005/api/experiences/id/${experienceId}`,
        requestOptions
      );

      if (response.ok) {
        const results = await response.json();
        console.log("results on Update :>> ", results);
        setExistingExperience(results.data);
        console.log("existingExperience :>> ", existingExperience);
      }
    } catch (error) {
      console.log("error in your update comp:>> ", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedExperience({ ...updatedExperience, [name]: value }); //!
  };

  const handleTypeInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setUpdatedExperience({
      ...updatedExperience,
      experienceType: e.target.value, //!
    });
  };

  const handlePhotoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e);
    setUpdatedPhoto(e.target.files?.[0] || "");
  };

  const handleUpdatedPhotoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //! DO i need this or do i just do it as part of my updateFetch
  };

  const handleUpdateExperience = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("no token found!");
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", `${updatedExperience.title}`);
    urlencoded.append("caption", `${updatedExperience.caption}`);
    urlencoded.append("photo", `${updatedExperience.photo}`);
    urlencoded.append("country", `${updatedExperience.location.country}`);
    urlencoded.append("city", `${updatedExperience.location.city}`);
    urlencoded.append("longitude", `${updatedExperience.location.longitude}`);
    urlencoded.append("latitude", `${updatedExperience.location.latitude}`);
    urlencoded.append("experienceType", `${updatedExperience.experienceType}`);
    urlencoded.append("text_body", `${updatedExperience.text_body}`);
    urlencoded.append("_id", `${experienceId}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/experiences/updateexperience",
        requestOptions
      );

      if (response.ok) {
        const results = await response.json();
        console.log("results for my Updated Experience :>> ", results);
        setUpdatedExperience(results.updatedExperience);
      }
    } catch (error) {
      console.log("error when trying to update your experience :>> ", error);
    }
    alert("Experience updated successfully!");
    console.log("updatedExperience :>> ", updatedExperience);
    navigateTo("/experiences");
  };

  useEffect(() => {
    setUpdatedExperience(updatedExperience);
    fetchExistingData();
  }, []);

  //   value={elementName}

  return (
    <div className="inputColorBox">
      <form onSubmit={handleUpdatedPhotoSubmit}>
        <label htmlFor="photo">photo</label>
        <input onChange={handlePhotoInputChange} name="photo" type="file" />
        <button type="submit">upload</button>
      </form>

      <form onSubmit={handleUpdateExperience}>
        <br />
        <label htmlFor="title">title:</label>
        <input
          onChange={handleInputChange}
          value={existingExperience!.title || updatedExperience.title}
          name="title"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="caption">caption:</label>
        <input
          onChange={handleInputChange}
          value={existingExperience!.caption || updatedExperience.caption}
          name="caption"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="country">country:</label>
        <input
          onChange={handleInputChange}
          value={
            existingExperience!.location.country ||
            updatedExperience.location.country
          }
          name="country"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="city">city:</label>
        <input
          onChange={handleInputChange}
          value={
            existingExperience!.location.city || updatedExperience.location.city
          }
          name="city"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="experienceType">experience type:</label>
        <select
          onChange={handleTypeInputChange}
          id="experienceType"
          name="experienceType"
          value={
            existingExperience!.experienceType ||
            updatedExperience.experienceType
          }
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
          onChange={handleInputChange}
          value={existingExperience!.text_body || updatedExperience.text_body}
          id="textInput"
          type="text"
        />
        <br />
        <button className="formButton" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default UpdateExperience;
