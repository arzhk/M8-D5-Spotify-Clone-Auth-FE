import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchArtistCard({ artist }) {
  return (
    <div
      /*       sm={12}
      md={6}
      lg={4}
      xl={3}
      className="d-flex justify-content-center justify-content-md-start px-0 mb-3 fade-in" */
      className="px-2 py-2"
    >
      <Link to={"/artist/" + artist.id}>
        <div className="album-card">
          <img src={artist.picture_medium} className="img-fluid rounded-circle" alt="album-art" />
          <h5>{artist.name}</h5>
        </div>
      </Link>
    </div>
  );
}

export default SearchArtistCard;
