import React, {useEffect, useState} from "react";
import "./styles.css";
import AppSpinner from "../../components/spinner";
import TabBar from "../../components/tab";
import SearchBar from "../../components/searchBar";
import Playlist from "../playlist/playlist";
import RenderSongList from "../../components/SongListItem/listItem";

const Home = () => {
  const [songList, setSongList] = useState();
  const [albumList, setAlbumList] = useState();

  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    const songs = JSON.parse(localStorage.getItem("songs"));
    const albums = JSON.parse(localStorage.getItem("albums"));
    if (songs && albums) {
      setSongList(songs);
      setAlbumList(albums);
    } else {
      Promise.all([
        fetch("https://jsonplaceholder.typicode.com/photos").then((value) =>
          value.json()
        ),
        fetch(" https://jsonplaceholder.typicode.com/albums").then((value) =>
          value.json()
        ),
      ])
        .then(([songs, albums]) => {
          setSongList(songs);
          setAlbumList(albums);
          localStorage.setItem("songs", JSON.stringify(songs));
          localStorage.setItem("albums", JSON.stringify(albums));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //Search Function
  // function handleSearch(e) {
  //   setQuery(e.target.value);
  //   setPageNumber(1);
  // }

  return (
    <div className="homebody">
      <div>Hello</div>
      {songList ? (
        <>
          <TabBar setShowPlaylist={setShowPlaylist} />
          <div className="ListBody">
            {showPlaylist ? (
              <Playlist albumList={albumList} songList={songList} />
            ) : (
              <>
                <SearchBar />
                {songList.map((song) => {
                  return (
                    <RenderSongList
                      key={song.id}
                      song={song}
                      albumList={albumList}
                    />
                  );
                })}
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
