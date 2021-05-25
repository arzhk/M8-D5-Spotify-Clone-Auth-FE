import React, { useState, useEffect } from "react";
import { Col, Alert } from "react-bootstrap";
import SearchTrackCard from "./SearchTrackCard";
import SearchArtistCard from "./SearchArtistCard";
import GenreCard from "./GenreCard";

function Search() {
  const [searchInput, setSearchInput] = React.useState("");
  const [searchResults_tracks, setSearchResults_tracks] = React.useState([]);
  const [searchResults_artists, setSearchResults_artists] = React.useState([]);
  const searchBox = React.useRef(null);

  const genres = [
    { id: 0, text: "All" },
    { id: 132, text: "Pop" },
    { id: 116, text: "Rap/Hip Hop" },
    { id: 152, text: "Rock" },
    { id: 113, text: "Dance" },
    { id: 165, text: "R&B" },
    { id: 85, text: "Alternative" },
    { id: 106, text: "Electro" },
    { id: 466, text: "Folk" },
    { id: 144, text: "Reggae" },
    { id: 129, text: "Jazz" },
    { id: 98, text: "Classical" },
    { id: 173, text: "Films/Games" },
    { id: 169, text: "Soul & Funk" },
    { id: 2, text: "African Music" },
    { id: 12, text: "Arabic Music" },
    { id: 16, text: "Asian Music" },
    { id: 153, text: "Blues" },
    { id: 75, text: "Brazilian Music" },
    { id: 81, text: "Indian Music" },
    { id: 95, text: "Kids" },
    { id: 197, text: "Latin Music" },
  ];

  const fetchHandler_tracks = async (searchterm) => {
    try {
      const response = await fetch(
        `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${searchterm}`
      );
      const data = await response.json();
      if (data.error) {
        return undefined;
      }
      return data.data;
    } catch (e) {
      console.error(`API ERROR : ${e.message}`);
    }
  };

  const fetchHandler_artists = async (searchterm) => {
    try {
      const response = await fetch(
        `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${searchterm}`
      );
      const data = await response.json();
      if (data.error) {
        return undefined;
      }
      let uniqueArtists = [];
      data.data.forEach((result) => {
        if (uniqueArtists.filter((artist) => artist.id === result.artist.id).length === 0) {
          uniqueArtists.push(result.artist);
        }
      });
      return uniqueArtists;
    } catch (e) {
      console.error(`API ERROR : ${e.message}`);
    }
  };

  const searchInputHandler = async (event) => {
    setSearchInput(event.target.value);
    setSearchResults_tracks(await fetchHandler_tracks(event.target.value));
    setSearchResults_artists(await fetchHandler_artists(event.target.value));
  };

  useEffect(() => {
    searchBox.current.focus();
  });

  return (
    <aside id="search">
      <div className="search-container">
        <div className="top-wrapper mb-5 d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
          <h2 className="d-inline-block pr-3 mr-3">Search</h2>
          <div className="search-bar">
            <input
              ref={searchBox}
              className="d-inline-block"
              type="text"
              placeholder="Search for Artists, Songs, or Podcasts"
              value={searchInput}
              onChange={searchInputHandler}
            />
            <div className="fa fa-search"></div>
          </div>
        </div>
        <div className="main-wrapper swing-in-top-fwd">
          <div id="search-content">
            {searchInput.length > 0 && <h4 className="search-header mb-4">Search results for... "{searchInput}"</h4>}
            <div id="artist-row" className="row mx-0 mb-0 mb-xl-4">
              <h4
                id="artist-header"
                className="w-100"
                style={searchInput.length > 0 ? { opacity: 1, display: "block" } : { opacity: 0, display: "none" }}
              >
                Artist
              </h4>
              {/* INSERT SEARCH CARDS HERE */}
              {searchResults_artists !== undefined &&
                searchResults_artists.length !== 0 &&
                searchResults_artists.map((artist, index) => <SearchArtistCard key={index} artist={artist} />)}
              {searchInput.length !== 0 &&
                searchResults_artists &&
                searchResults_artists.filter((e) => e !== undefined).length === 0 && (
                  <Col xs={4} className="px-0">
                    <Alert variant="danger">No results found.</Alert>
                  </Col>
                )}
            </div>
            <div id="songs-row" className="row mx-0 mb-0 mb-xl-4">
              <h4 id="tracks-header" className="w-100" style={searchInput.length > 0 ? { opacity: 1 } : { opacity: 0 }}>
                Tracks
              </h4>
              {/* INSERT SEARCH CARDS HERE */}
              {searchResults_tracks !== undefined &&
                searchResults_tracks.length !== 0 &&
                searchResults_tracks.map((track, index) => <SearchTrackCard key={index} track={track} />)}
              {searchInput.length !== 0 &&
                searchResults_tracks &&
                searchResults_tracks.filter((e) => e !== undefined).length === 0 && (
                  <Col xs={4} className="px-0">
                    <Alert variant="danger">No results found.</Alert>
                  </Col>
                )}
            </div>
          </div>
          <h4 id="browse-genres-header" className="my-4">
            Browse Genres
          </h4>
          <div id="genres-wrapper" className="swing-in-top-fwd-dly">
            {/* INSERT BROWSE CARDS HERE */}
            {genres.map((genre, index) => (
              <GenreCard key={index} data={genre} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Search;
