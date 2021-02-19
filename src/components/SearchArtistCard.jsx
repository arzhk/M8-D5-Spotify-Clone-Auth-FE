import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchArtistCard({ artist }) {
  console.log(artist);
  return (
    <Col
      sm={12}
      md={6}
      lg={4}
      xl={3}
      className="d-flex justify-content-center justify-content-md-start px-0 mb-3 fade-in"
    >
      <Link to={"/artist/" + artist.id}>
        <div className="album-card">
          <img src={artist.picture_medium} className="img-fluid rounded-circle" alt="album-art" />
          <h5>{artist.name}</h5>
        </div>
      </Link>
    </Col>
  );
}

export default SearchArtistCard;
