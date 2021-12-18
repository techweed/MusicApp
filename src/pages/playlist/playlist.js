import React from "react";
import RenderSongList from "../../components/SongListItem/listItem";
import "./styles.css";

const Playlist = ({
  albumList,
  state,
  setState,
  playlist,
  setPlaylist,
  selectedPlaylist,
  setSelectedPlaylist,
}) => {
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
        <div
          className="cardEnd"
          onClick={(e) => {
            e.stopPropagation();
            let temp = [...playlist];
            temp.splice(index, 1);
            setPlaylist(temp);
            localStorage.setItem("playlist", JSON.stringify(temp));
          }}
        >
          x
        </div>
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
          {state === 3 && "Add songs to "}
          {`${playlist[selectedPlaylist]?.name} (${playlist[selectedPlaylist]?.songs?.length})`}
        </div>
      )}
      {state === 1 &&
        (playlist.length ? (
          playlist?.map((item, index) => (
            <RenderPlaylist key={item?.createdAt} item={item} index={index} />
          ))
        ) : (
          <div>Create a playlist!</div>
        ))}
      {state === 2 &&
        (playlist?.[selectedPlaylist]?.songs.length ? (
          playlist?.[selectedPlaylist]?.songs?.map((item) => (
            <RenderSongList
              key={item.id}
              song={item}
              albumList={albumList}
              playlist={playlist}
              setPlaylist={setPlaylist}
              selectedPlaylist={selectedPlaylist}
            />
          ))
        ) : (
          <div>Add a song to the list!</div>
        ))}
    </>
  );
};
export default Playlist;
