import { useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import { Experience } from "../types/customTypes";
import ExpCards from "./ExpCard";
import { ExperiencesContext } from "../context/ExperiencesContext";
import Loader from "./Loader";

export interface SearchProps {
  urlParams: string | null;
}

function ExpLayout() {
  const { experiences, fetchExperiences } = useContext(ExperiencesContext);

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div>
      <h1>experiences</h1>
      <nav className="expTypeNavbar">
        <NavLink to={"all"}>all</NavLink> <span> | </span>
        <NavLink to={"hiking"}>hiking</NavLink> <span> | </span>
        <NavLink to={"wildlife"}>wildlife</NavLink> <span> | </span>
        <NavLink to={"wildlife"}>roadtrips</NavLink> <span> | </span>
        <NavLink to={"wildlife"}>city walks</NavLink>
        <span> | </span>
        <NavLink to={"wildlife"}>scenery</NavLink>
        <span> | </span>
        <NavLink to={"wildlife"}>fauna & flora</NavLink>
      </nav>
      <Outlet />
      <div>
        <div className="RecipeContainer">
          {experiences ? (
            experiences.map((experience, expID) => {
              return (
                <div key={expID}>
                  <ExpCards
                    key={"1" + experience.publication_date}
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
