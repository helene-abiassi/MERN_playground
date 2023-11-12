import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import { Experience } from "../types/customTypes";
import ExpCards from "./ExpCard";
import { ExperiencesContext } from "../context/ExperiencesContext";
import Loader from "./Loader";
import SearchBox from "./SearchBox";

function ExpLayout() {
  const { experiences, fetchExperiences } = useContext(ExperiencesContext);
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  const handleSearch = (criteria: string) => {
    if (!experiences) {
      return;
    }

    let sortedExperiences = [...experiences];

    switch (criteria) {
      case "":
        sortedExperiences = sortedExperiences.sort(
          (a, b) =>
            new Date(b.publication_date).getTime() -
            new Date(a.publication_date).getTime()
        );
        break;
      case "Most Bookmarked":
        sortedExperiences = sortedExperiences.sort(
          (a, b) => b.bookmarked_by.length - a.bookmarked_by.length
        );
        break;
      case "Newest":
        sortedExperiences = sortedExperiences.sort(
          (a, b) =>
            new Date(b.publication_date).getTime() -
            new Date(a.publication_date).getTime()
        );
        break;
      case "Oldest":
        sortedExperiences = sortedExperiences.sort(
          (a, b) =>
            new Date(a.publication_date).getTime() -
            new Date(b.publication_date).getTime()
        );
        break;
      case "Most Commented":
        sortedExperiences = sortedExperiences.sort(
          (a, b) => b.comments!.length - a.comments!.length
        );
        break;
      default:
        break;
    }

    setFilteredExperiences(sortedExperiences);
  };

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
        <SearchBox onSearch={handleSearch} />
        <div>
          {filteredExperiences && filteredExperiences.length > 0 ? (
            filteredExperiences.map((experience, expID) => (
              <div key={expID}>
                <ExpCards
                  key={"1" + experience.publication_date}
                  experience={experience}
                />
              </div>
            ))
          ) : experiences && experiences.length > 0 ? (
            experiences
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.publication_date).getTime() -
                  new Date(a.publication_date).getTime()
              )
              .map((experience, expID) => (
                <div key={expID}>
                  <ExpCards
                    key={"1" + experience.publication_date}
                    experience={experience}
                  />
                </div>
              ))
          ) : (
            <h2>...something went wrong...</h2>
          )}

        </div>
      </div>
    </div>
  );
}

export default ExpLayout;
