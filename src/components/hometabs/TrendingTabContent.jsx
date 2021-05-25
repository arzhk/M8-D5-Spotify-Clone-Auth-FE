import React, { useState, useEffect } from "react";
import HomeAlbumCard from "../HomeAlbumCard";
import HomePlaylistAlbumCard from "../HomePlaylistAlbumCard";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  storeFetch: (fetchResults) => dispatch({ type: "ADD_SONGS_TRENDING", payload: fetchResults }),
});

function TrendingTabContent(props) {
  const { trending } = props.songs;
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [popularPlaylists, setPopularPlaylists] = useState([]);

  const [popularAlbumsLoaded, setPopularAlbumsLoaded] = useState(false);
  const [trendingNowLoaded, setTrendingNowLoaded] = useState(false);
  const [popularPlaylistsLoaded, setPopularPlaylistsLoaded] = useState(false);

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
    await setPopularAlbums(await fetchAlbumDataHandler("playlist/3155776842?limit=15"));
    setPopularAlbumsLoaded(true);

    await setTrendingNow(await fetchAlbumDataHandler("playlist/1111142221?limit=15"));
    setTrendingNowLoaded(true);

    await setPopularPlaylists(await fetchAlbumDataHandler("chart"));
    setPopularPlaylistsLoaded(true);

    props.storeFetch({ popularAlbums: popularAlbums });
    props.storeFetch({ trendingNow: trendingNow });
    props.storeFetch({ popularPlaylists: popularPlaylists });
  };

  const startFromState = async () => {
    await setPopularAlbums(trending.popularAlbums);
    setPopularAlbumsLoaded(true);

    await setTrendingNow(trending.trendingNow);
    setTrendingNowLoaded(true);

    await setPopularPlaylists(trending.popularPlaylists);
    setPopularPlaylistsLoaded(true);
  };

  useEffect(() => {
    if (
      trending.popularPlaylists &&
      trending.popularAlbums.length !== 0 &&
      trending.trendingNow.length !== 0 &&
      trending.popularPlaylists.length !== 0
    ) {
      startFromState();
    } else {
      startNew();
    }
  }, []);

  useEffect(() => {
    if (
      trending.popularPlaylists &&
      trending.popularAlbums.length !== 0 &&
      trending.trendingNow.length !== 0 &&
      trending.popularPlaylists.length !== 0
    ) {
      startFromState();
    } else {
      startNew();
    }
  }, [trending]);

  return (
    <div className="tab-pane fade show active" id="trending" role="tabpanel" aria-labelledby="trending-tab">
      <h2 className="mb-4 pb-2">#Trending</h2>
      <div className="content-wrapper swing-in-top-fwd">
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3 style={{ width: "50%" }}>Popular albums</h3>
        </div>
        <div id="popular-albums-container" className="mb-0 mb-xl-4">
          <div id="popular-albums-row" className="row mb-0 mb-xl-4">
            {popularAlbumsLoaded
              ? popularAlbums.map((album, index) => <HomeAlbumCard key={index} album={album} />)
              : [...Array(popularAlbums.length)].map((loader) => (
                  <Col sm={12} md={6} lg={4} xl={3} className="col-xxl-2 mb-2 pr-3 pr-md-2 px-lg-2 fade-in">
                    <SkeletonTheme color="rgba(255,255,255,0.05)" highlightColor="rgba(255,255,255,0.08)">
                      <Skeleton height={308} />
                    </SkeletonTheme>
                  </Col>
                ))}
          </div>
        </div>
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3 style={{ width: "50%" }}>Trending Now</h3>
        </div>
        <div id="trending-now-albums-container" className="mb-0 mb-xl-4">
          <div id="trending-now-row" className="row mb-0 mb-0 mb-xl-4">
            {trendingNowLoaded
              ? trendingNow
                  .filter((e) => e !== undefined)
                  .map((album, index) => <HomeAlbumCard key={index} album={album} />)
              : [...Array(trendingNow.length)].map((loader) => (
                  <Col sm={12} md={6} lg={4} xl={3} className="col-xxl-2 mb-2 pr-3 pr-md-2 px-lg-2 fade-in">
                    <SkeletonTheme color="rgba(255,255,255,0.05)" highlightColor="rgba(255,255,255,0.08)">
                      <Skeleton height={308} />
                    </SkeletonTheme>
                  </Col>
                ))}
          </div>
        </div>
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3 style={{ width: "50%" }}>Popular playlists</h3>
        </div>
        <div id="popular-playlists-container" className="mb-0 mb-xl-4">
          <div id="popular-playlists-row" className="row mb-0 mb-xl-4">
            {popularPlaylistsLoaded
              ? popularPlaylists
                  .filter((e) => e !== undefined)
                  .map((playlist, index) => <HomePlaylistAlbumCard key={index} playlist={playlist} />)
              : [...Array(popularPlaylists.length)].map((loader) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(TrendingTabContent);
