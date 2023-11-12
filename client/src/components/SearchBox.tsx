import { useEffect } from "react";

export interface SearchBoxProps {
  onSearch: (criteria: string) => void;
}

function SearchBox({ onSearch }: SearchBoxProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = event.target.value;
    onSearch(criteria);
    if (criteria === "Sort By") {
      onSearch("");
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="mainSearchBox">
      <div className="searchBox">
        <div className="searchByCombo">
          <div className="searchByIngBox"></div>
          <select onChange={handleSearch} defaultValue="Sort By">
            <option value={"Sort By"}>Sort By</option>
            <option value={"Most Bookmarked"}>Most Bookmarked</option>
            <option value={"Newest"}>Newest</option>
            <option value={"Oldest"}>Oldest</option>
            <option value={"Most Commented"}>Most Commented</option>
            {/*Add title/ city/ country?*/}
          </select>
          <button>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
