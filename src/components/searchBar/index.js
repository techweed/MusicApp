import "./searchBar.css";
function SearchBar() {
  return (
    <div className="input-container">
      <input
        type="text"
        // value={query}
        // onChange={handleSearch}
        placeholder="Search"
        className="search"
      ></input>
    </div>
  );
}

export default SearchBar;
