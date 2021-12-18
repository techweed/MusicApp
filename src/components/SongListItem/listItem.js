import "./listItem.css";

const RenderSongList = ({
  song,
  albumList,
  state,
  setState,
  selectedPlaylist,
  setPlaylist,
  playlist,
}) => {
  return (
    <div
      className="item"
      onClick={() => {
        if (state === 3) {
          if (
            playlist[selectedPlaylist].songs.find((item) => item.id === song.id)
          ) {
            alert("Song already added");
          } else {
            playlist[selectedPlaylist].songs.push(song);
            setPlaylist(playlist);
            localStorage.setItem("playlist", JSON.stringify(playlist));
            setState(2);
          }
        }
      }}
    >
      <div className="cardRight">
        <img src={song?.thumbnailUrl} className="image" alt="Logo" />
      </div>
      <div className="cardLeft">
        <div className="cardTitle">
          {albumList?.find((album) => album?.id === song?.albumId)?.title}
        </div>
        <div className="desc">{song.title}</div>
      </div>
    </div>
  );
};
export default RenderSongList;
