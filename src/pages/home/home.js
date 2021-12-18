import React, {useEffect, useState} from "react";

import AppSpinner from "../../components/spinner";
import TabBar from "../../components/tab";
import SearchBar from "../../components/searchBar";
import Playlist from "../playlist/playlist";
import RenderSongList from "../../components/SongListItem/listItem";
import "./styles.css";

const Home = () => {
  const [songList, setSongList] = useState();
  const [searchRes, setSearchRes] = useState();
  const [albumList, setAlbumList] = useState();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [keyword, setKeyword] = useState("");
  // =====================================
  // playlist props
  // playlist has 3 states
  // 1. listing playlists
  // 2. listing songs within a playlist
  // 3. listing all songs with search for adding to playlist
  //========================================================
  const [state, setState] = useState(1);
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem("playlist")) || []
  );
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Retriving cached data or calling the api
  useEffect(() => {
    const songs = JSON.parse(localStorage.getItem("songs"));
    const albums = JSON.parse(localStorage.getItem("albums"));
    if (songs && albums) {
      setSongList(songs);
      setSearchRes(songs);
      setAlbumList(albums);
    } else {
      Promise.all([
        fetch("https://jsonplaceholder.typicode.com/photos").then((value) =>
          value.json()
        ),
        fetch(" https://jsonplaceholder.typicode.com/albums").then((value) =>
          value.json()
        ),
      ]).then(([songs, albums]) => {
        setSongList(songs);
        setAlbumList(albums);
        localStorage.setItem("songs", JSON.stringify(songs));
        localStorage.setItem("albums", JSON.stringify(albums));
      });
    }
  }, []);

  // Search Function
  function handleSearch(e) {
    setKeyword(e.target.value);
    let res = songList.filter((item) => item.title.includes(e.target.value));
    setSearchRes([...res]);
  }

  return (
    <div className="homebody">
      {songList?.length ? (
        <>
          <TabBar setShowPlaylist={setShowPlaylist} />
          <div className="ListBody">
            {showPlaylist && (
              <Playlist
                albumList={albumList}
                state={state}
                setState={setState}
                playlist={playlist}
                setPlaylist={setPlaylist}
                selectedPlaylist={selectedPlaylist}
                setSelectedPlaylist={setSelectedPlaylist}
              />
            )}
            {(!showPlaylist || state === 3) && (
              <>
                <SearchBar
                  handleSearch={handleSearch}
                  keyword={keyword}
                  setKeyword={setKeyword}
                />
                {searchRes?.length ? (
                  searchRes.map((song) => {
                    return (
                      <RenderSongList
                        key={song.id}
                        song={song}
                        albumList={albumList}
                        state={state}
                        setState={setState}
                        selectedPlaylist={selectedPlaylist}
                        setPlaylist={setPlaylist}
                        playlist={playlist}
                      />
                    );
                  })
                ) : (
                  <div>No Results</div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <AppSpinner />
      )}
    </div>
  );
};

export default Home;
