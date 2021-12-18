import "./searchBar.css";
function SearchBar({handleSearch, setKeyword, keyword}) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={keyword}
        onChange={handleSearch}
        placeholder="Search"
        className="search"
      ></input>
    </div>
  );
}

export default SearchBar;
