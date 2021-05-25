import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import HomeAlbumCard from "../HomeAlbumCard";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  storeFetch: (fetchResults) => dispatch({ type: "ADD_SONGS_NEW", payload: fetchResults }),
});

function NewReleasesTabContent(props) {
  const { newRelease } = props.songs;
  const [newReleases, setNewReleases] = useState([]);
  const [newReleasesLoaded, setNewReleasesLoaded] = useState(false);

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
    await setNewReleases(await fetchAlbumDataHandler("playlist/63141574?limit=15"));
    setNewReleasesLoaded(true);

    props.storeFetch(newReleases);
  };

  const startFromState = async () => {
    await setNewReleases(newRelease);
    setNewReleasesLoaded(true);
  };

  React.useEffect(() => {
    if (newRelease && newRelease.length !== 0) {
      startFromState();
    } else {
      startNew();
    }
  }, []);

  useEffect(() => {
    if (newRelease && newRelease.length !== 0) {
      startFromState();
    } else {
      startNew();
    }
  }, [newRelease]);

  return (
    <div className="tab-pane fade show active" id="new-releases" role="tabpanel" aria-labelledby="new-releases-tab">
      <h2 className="mb-4 pb-2">#New Releases</h2>
      <div className="content-wrapper swing-in-top-fwd">
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3>The best new releases</h3>
        </div>
        <div id="popular-albums-container" className="mb-0 mb-xl-4">
          <div id="best-new-releases-row" className="row mb-0 mb-xl-4">
            {newReleasesLoaded
              ? newReleases.map((album, index) => <HomeAlbumCard key={index} album={album} />)
              : [...Array(newReleases.length)].map((loader) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(NewReleasesTabContent);
