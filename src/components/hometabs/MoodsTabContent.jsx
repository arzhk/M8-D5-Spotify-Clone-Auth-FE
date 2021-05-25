import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import HomeAlbumCard from "../HomeAlbumCard";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  storeFetch: (fetchResults) => dispatch({ type: "ADD_SONGS_MOODS", payload: fetchResults }),
});

function MoodsTabContent(props) {
  const { moodsAndGenres } = props.songs;
  const [edmAlbums, setEdmAlbums] = useState([]);
  const [edmAlbumsLoaded, setEdmAlbumsLoaded] = useState(false);

  const [workoutAlbums, setWorkoutAlbums] = useState([]);
  const [workoutAlbumsLoaded, setWorkoutAlbumsLoaded] = useState(false);

  const [chillAlbums, setChillAlbums] = useState([]);
  const [chillAlbumsLoaded, setChillAlbumsLoaded] = useState(false);

  const fetchAlbumDataHandler = async (endpoint) => {
    try {
      const response = await fetch(
        `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/https://api.deezer.com/${endpoint}`
      );

      const data = await response.json();
      if (!data.error) {
        if (!data.playlists) {
          let uniqueAlbums = [];
          await data.tracks.data.forEach((track) => {
            !uniqueAlbums.some((uniqueTrack) => uniqueTrack.album.id === track.album.id) && uniqueAlbums.push(track);
          });
          return uniqueAlbums;
        } else {
          return data.playlists.data;
        }
      } else {
        console.log("There was an error when fetching");
      }
    } catch (e) {
      console.error(`API ERROR : ${e.message}`);
    }
  };

  const startNew = async () => {
    await setEdmAlbums(await fetchAlbumDataHandler("playlist/4503899902?limit=10"));
    setEdmAlbumsLoaded(true);
    await setWorkoutAlbums(await fetchAlbumDataHandler("playlist/1857061922?limit=10"));
    setWorkoutAlbumsLoaded(true);
    await setChillAlbums(await fetchAlbumDataHandler("playlist/3338949242?limit=10"));
    setChillAlbumsLoaded(true);

    props.storeFetch({ edmAlbums: edmAlbums });
    props.storeFetch({ workoutAlbums: workoutAlbums });
    props.storeFetch({ chillAlbums: chillAlbums });
  };

  const startFromState = async () => {
    setEdmAlbums(moodsAndGenres.edmAlbums);
    setEdmAlbumsLoaded(true);
    setWorkoutAlbums(moodsAndGenres.workoutAlbums);
    setWorkoutAlbumsLoaded(true);
    setChillAlbums(moodsAndGenres.chillAlbums);
    setChillAlbumsLoaded(true);
  };

  React.useEffect(() => {
    if (
      moodsAndGenres.edmAlbums &&
      moodsAndGenres.edmAlbums.length !== 0 &&
      moodsAndGenres.workoutAlbums.length !== 0 &&
      moodsAndGenres.chillAlbums.length !== 0
    ) {
      startFromState();
    } else {
      startNew();
    }
  }, []);

  useEffect(() => {
    if (
      moodsAndGenres.edmAlbums &&
      moodsAndGenres.edmAlbums.length !== 0 &&
      moodsAndGenres.workoutAlbums.length !== 0 &&
      moodsAndGenres.chillAlbums.length !== 0
    ) {
      startFromState();
    } else {
      startNew();
    }
  }, [moodsAndGenres]);

  return (
    <div
      className="tab-pane fade show active"
      id="moods-and-genres"
      role="tabpanel"
      aria-labelledby="moods-and-genres-tab"
    >
      <h2 className="mb-4 pb-2">#Moods and Genres</h2>
      <div className="content-wrapper swing-in-top-fwd">
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3>EDM</h3>
        </div>
        <div id="edm-container" className="mb-0 mb-xl-4">
          <div id="edm-row" className="row mb-0 mb-xl-4">
            {edmAlbumsLoaded
              ? edmAlbums.map((album, index) => <HomeAlbumCard key={index} album={album} />)
              : [...Array(edmAlbums.length)].map((loader) => (
                  <Col sm={12} md={6} lg={4} xl={3} className="col-xxl-2 mb-2 pr-3 pr-md-2 px-lg-2 fade-in">
                    <SkeletonTheme color="rgba(255,255,255,0.05)" highlightColor="rgba(255,255,255,0.08)">
                      <Skeleton height={308} />
                    </SkeletonTheme>
                  </Col>
                ))}
          </div>
        </div>
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3>Workout</h3>
        </div>
        <div id="workout-mood-albums-container" className="mb-0 mb-xl-4">
          <div id="workout-mood-row" className="row mb-0 mb-0 mb-xl-4">
            {workoutAlbumsLoaded
              ? workoutAlbums.map((album, index) => <HomeAlbumCard key={index} album={album} />)
              : [...Array(workoutAlbums.length)].map((loader) => (
                  <Col sm={12} md={6} lg={4} xl={3} className="col-xxl-2 mb-2 pr-3 pr-md-2 px-lg-2 fade-in">
                    <SkeletonTheme color="rgba(255,255,255,0.05)" highlightColor="rgba(255,255,255,0.08)">
                      <Skeleton height={308} />
                    </SkeletonTheme>
                  </Col>
                ))}
          </div>
        </div>
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3>Relax & Chill</h3>
        </div>
        <div id="chill-albums-container" className="mb-0 mb-xl-4">
          <div id="chill-mood-row" className="row mb-0 mb-xl-4">
            {chillAlbumsLoaded
              ? chillAlbums.map((album, index) => <HomeAlbumCard key={index} album={album} />)
              : [...Array(chillAlbums.length)].map((loader) => (
                  <Col sm={12} md={6} lg={4} xl={3} className="col-xxl-2 mb-2 pr-3 pr-md-2 px-lg-2 fade-in">
                    <SkeletonTheme color="rgba(255,255,255,0.05)" highlightColor="rgba(255,255,255,0.08)">
                      <Skeleton height={308} />
                    </SkeletonTheme>
                  </Col>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MoodsTabContent);
