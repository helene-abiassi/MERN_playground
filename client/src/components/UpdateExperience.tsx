import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Experience } from "../types/customTypes";

// fields to update in a state
// all fields to update in object, take
// when submit form, you call the function
// pass arguments that you need to update

// pass all the values, and if there's no update, keep and only call the update function for the values that changed

function UpdateExperience() {
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
  const [elementName, setElementName] = useState(); //Tie these to values in input fields
  const [elementValue, setElementValue] = useState();

  const { experienceId } = useParams();
  console.log("experienceId :>> ", experienceId);

  const { isLoggedIn } = useContext(AuthContext);

  const navigateTo = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const setElementValue = "X";
    const { name, value } = e.target;
  };

  const handleTypeInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setUpdatedExperience({
      ...updatedExperience,
      experienceType: e.target.value,
    });
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
    urlencoded.append("elementName", `${elementName}`);
    urlencoded.append("elementValue", `${elementValue}`);
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
        setUpdatedExperience(results);
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
  }, [isLoggedIn]);

  return (
    <div>
      <form className="inputColorBox" onSubmit={handleUpdateExperience}>
        <br />
        <label htmlFor="title">title:</label>
        <input
          onChange={handleInputChange}
          value={updatedExperience.title}
          name="title"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="caption">caption:</label>
        <input
          onChange={handleInputChange}
          value={updatedExperience.caption}
          name="caption"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="country">country:</label>
        <input
          onChange={handleInputChange}
          value={updatedExperience.location.country}
          name="country"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="city">city:</label>
        <input
          onChange={handleInputChange}
          value={updatedExperience.location.city}
          name="city"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="experienceType">experience type:</label>
        <select
          // onChange={handleTypeInput}
          id="experienceType"
          name="experienceType"
          value={updatedExperience.experienceType}
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
