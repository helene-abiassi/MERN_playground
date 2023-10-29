import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Experience } from "../types/customTypes";
import ExpCards from "./ExpCard";

function ExpLayout() {
  const [experiences, setExpriences] = useState<Experience[]>([
    {
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
      publication_date: Date(),
      location: {
        country: "",
        city: "",
        longitude: "",
        latitude: "",
      },
      experienceType: "",
      text_body: "",
      bookmarked_by: [
        {
          _id: "",
          usernam: "",
          bio: "",
          member_since: Date(),
          user_image: "",
        },
      ],
      comments: [
        {
          author: {
            _id: "",
            email: "",
            username: "",
            user_image: "",
          },
          date: Date(),
          message: "",
        },
      ],
    },
  ]);
  const [urlParams, setUrlParams] = useState("all");

  const fetchExperiences = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const results = await fetch(
        `http://localhost:5005/api/experiences/${urlParams}`,
        requestOptions
      );

      console.log("results :>> ", results);

      if (results.status === 200) {
        const data = await results.json();
        console.log("data :>> ", data);
        const experienceList = data.data as Experience[];

        console.log("experienceList :>> ", experienceList);

        setUrlParams(urlParams);
        setExpriences(experienceList);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [urlParams]);

  return (
    <div>
      <h1>experiences</h1>
      <nav>
        <NavLink to={"all"}>all</NavLink> <span> | </span>
        <NavLink to={"hiking"}>hiking</NavLink> <span> | </span>
        <NavLink to={"wildlife"}>wildlife</NavLink>
      </nav>
      <Outlet />
      <div>
        <div className="RecipeContainer">
          {experiences ? (
            experiences.map((experience, expID) => {
              return (
                <div key={expID}>
                  <ExpCards
                    key={"1" + experience._id}
                    experience={experience}
                  />
                </div>
              );
            })
          ) : (
            <h2>...something went wrong...</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpLayout;
