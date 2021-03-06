import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import HomePlaylistAlbumCard from "../HomePlaylistAlbumCard";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  storeFetch: (fetchResults) => dispatch({ type: "ADD_SONGS_PODCAST", payload: fetchResults }),
});

function PodcastTabContent(props) {
  const { podcast } = props.songs;
  const [topPodcasts, setTopPodcasts] = useState([]);

  const [topPodcastsLoaded, setTopPodcastsLoaded] = useState(false);

  const fetchAlbumDataHandler = async (endpoint) => {
    try {
      const response = await fetch(
        `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/https://api.deezer.com/${endpoint}`
      );

      const data = await response.json();
      if (!data.error) {
        return data.podcasts.data;
      } else {
        console.log("There was an error when fetching");
      }
    } catch (e) {
      console.error(`API ERROR : ${e.message}`);
    }
  };

  const startNew = async () => {
    await setTopPodcasts((await fetchAlbumDataHandler("chart")).splice(0, 15));
    setTopPodcastsLoaded(true);

    props.storeFetch(topPodcasts);
  };

  const startFromState = async () => {
    await setTopPodcasts(podcast);
    setTopPodcastsLoaded(true);
  };

  useEffect(() => {
    if (podcast && podcast.length !== 0) {
      startFromState();
    } else {
      startNew();
    }
  }, []);

  useEffect(() => {
    if (podcast && podcast.length !== 0) {
      startFromState();
    } else {
      startNew();
    }
  }, [podcast]);

  return (
    <div className="tab-pane fade show active" id="podcast" role="tabpanel" aria-labelledby="podcast-tab">
      <h2 className="mb-4 pb-2">#Podcast</h2>
      <div className="content-wrapper swing-in-top-fwd">
        <div className="album-header-wrapper d-flex justify-content-between align-items-center">
          <h3>Top podcasts</h3>
        </div>
        <div id="top-podcasts-container" className="mb-0 mb-xl-4">
          <div id="top-podcasts-row" className="row mb-0 mb-xl-4">
            {topPodcastsLoaded
              ? topPodcasts
                  .filter((e) => e !== undefined)
                  .map((playlist, index) => <HomePlaylistAlbumCard key={index} playlist={playlist} />)
              : [...Array(topPodcasts.length)].map((loader) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(PodcastTabContent);
