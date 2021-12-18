import React, {useState} from "react";
import SearchBar from "../../components/searchBar";
import RenderSongList from "../../components/SongListItem/listItem";
import "./styles.css";

const Playlist = ({albumList, songList}) => {
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem("playlist")) || []
  );
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [state, setState] = useState(1);

  const RenderPlaylist = ({item, index}) => {
    return (
      <div
        className="item"
        onClick={() => {
          setState(2);
          setSelectedPlaylist(index);
        }}
      >
        <div className="cardLeft">
          <div className="cardTitle">{item?.name}</div>
          <div className="desc">{item?.songs?.length}</div>
          <div className="desc-i">{item?.createdAt}</div>
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
              let newPlaylist = [
                ...playlist,
                {
                  name: "Playlist",
                  songs: [],
                  createdAt: new Date().toDateString(),
                },
              ];
              setPlaylist(newPlaylist);
              localStorage.setItem("playlist", JSON.stringify(newPlaylist));
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
              setSelectedPlaylist(null);
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
          onClick={() => {
            let shuffledsongs = playlist[selectedPlaylist].songs.sort(
              (a, b) => 0.5 - Math.random()
            );
            playlist[selectedPlaylist].songs = shuffledsongs;
            setPlaylist([...playlist]);
          }}
        >
          Shuffle
        </button>
      )}
      {state !== 1 && (
        <div className="playlistTitle">
          {`${playlist[selectedPlaylist].name} (${playlist[selectedPlaylist].songs?.length})`}
        </div>
      )}
      {state === 1 &&
        playlist?.map((item, index) => (
          <RenderPlaylist key={item?.createdAt} item={item} index={index} />
        ))}
      {state === 2 &&
        playlist?.[selectedPlaylist]?.songs?.map((item) => (
          <RenderSongList key={item.id} song={item} albumList={albumList} />
        ))}

      {state === 3 && (
        <>
          <SearchBar />
          {songList?.map((item) => (
            <RenderSongList
              key={item.id}
              song={item}
              albumList={albumList}
              state={state}
              setState={setState}
              selectedPlaylist={selectedPlaylist}
              setPlaylist={setPlaylist}
              playlist={playlist}
            />
          ))}
        </>
      )}
    </>
  );
};
export default Playlist;
