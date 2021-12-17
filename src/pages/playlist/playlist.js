import React, {useEffect, useState} from "react";
import SearchBar from "../../components/searchBar";
import RenderSongList from "../../components/SongListItem/listItem";
import "./styles.css";

const Playlist = ({albumList, songList}) => {
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem("playlist")) || []
  );
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [state, setState] = useState(1);

  const RenderPlaylist = ({item}) => {
    console.log(item);
    return (
      <div
        className="item"
        onClick={() => {
          setState(2);
          setPlaylistSongs(item?.songs);
        }}
      >
        <div className="cardLeft">
          <div className="cardTitle">{item?.name}</div>
          <div className="desc">{item?.songs?.length}</div>
          <div className="desc-i">{item?.createdAt.toDateString()}</div>
        </div>
        <div className="cardEnd">x</div>
      </div>
    );
  };

  return (
    <>
      {state !== 3 && (
        <button
          className="float-btn float-bottom"
          onClick={() => {
            if (state === 1) {
              setPlaylist([
                ...playlist,
                {
                  name: "Playlist",
                  songs: [],
                  createdAt: new Date(),
                },
              ]);
            } else {
              setState(3);
            }
          }}
        >
          +
        </button>
      )}
      {state !== 1 && (
        <button
          className="float-btn float-top"
          onClick={() => {
            if (state === 2) {
              setPlaylistSongs([]);
              setState(1);
            } else {
              setState(2);
            }
          }}
        >
          Back
        </button>
      )}
      {state === 2 && (
        <button
          className="float-btn float-right"
          onClick={() => setPlaylistSongs([])}
        >
          Shuffle
        </button>
      )}
      {state === 1 &&
        playlist?.map((item) => (
          <RenderPlaylist key={item?.createdAt} item={item} />
        ))}
      {state === 2 &&
        playlistSongs.map((item) => (
          <RenderSongList key={item.id} song={item} albumList={albumList} />
        ))}

      {state === 3 && (
        <>
          <SearchBar />
          {songList?.map((item) => (
            <RenderSongList key={item.id} song={item} albumList={albumList} />
          ))}
        </>
      )}
    </>
  );
};
export default Playlist;
