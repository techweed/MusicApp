import "./tab.css";
function TabBar({setShowPlaylist}) {
  return (
    <div className="container">
      <div className="tabs">
        <input
          type="radio"
          id="radio-1"
          name="tabs"
          onClick={() => setShowPlaylist(false)}
        />
        <label className="tab" htmlFor="radio-1">
          All Songs
        </label>
        <input
          type="radio"
          id="radio-2"
          name="tabs"
          onClick={() => setShowPlaylist(true)}
        />
        <label className="tab" htmlFor="radio-2">
          Playlists
        </label>
        <span className="glider"></span>
      </div>
    </div>
  );
}

export default TabBar;
