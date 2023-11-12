import { ChangeEvent, useEffect, useState } from "react";

export interface SearchBoxProps {
  onCriteriaSearch: (criteria: string) => void;
  onCitySearch: (city: string) => void;
}

function SearchBox({ onCriteriaSearch, onCitySearch }: SearchBoxProps) {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchCityInput, setSearchCityInput] = useState("");

  const handleCriteriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const criteria = e.target.value;
    setSearchCriteria(criteria);
    onCriteriaSearch(criteria);
    if (criteria === "Sort By") {
      setSearchCriteria("");
      onCriteriaSearch("");
    }
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = e.target.value.toLowerCase();
    setSearchCityInput(normalizedQuery);
  };

  const handleSearchClick = () => {
    setSearchCity(searchCityInput);

    onCitySearch(searchCityInput);
  };

  useEffect(() => {
    // onCriteriaSearch("")
    // handleSearchClick();
  }, [searchCityInput]);
  return (
    <div className="mainSearchBox">
      <div className="searchBox">
        <div className="searchByCombo">
          <div className="searchByIngBox">
            <input
              type="text"
              placeholder="Search by city..."
              value={searchCityInput}
              onChange={handleCityChange}
            />
          </div>
          <select onChange={handleCriteriaChange}>
            <option value={""}>Sort By</option>
            <option value={"Most Bookmarked"}>Most Bookmarked</option>
            <option value={"Newest"}>Newest</option>
            <option value={"Oldest"}>Oldest</option>
            <option value={"Most Commented"}>Most Commented</option>
          </select>
          <button className="searchButton" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );

}

export default SearchBox;
