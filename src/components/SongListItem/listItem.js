import "./listItem.css";

const RenderSongList = ({song, albumList}) => (
  <div className="item" onClick={() => window.open(song.url, "_blank")}>
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
export default RenderSongList;
