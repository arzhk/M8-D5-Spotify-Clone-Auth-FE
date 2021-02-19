import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchTrackCard({ track }) {
  return (
    <Col sm={12} md={6} lg={4} xl={3} className="col-xxl-2 mb-3 px-0 fade-in">
      <Link to={"/album/" + track.album.id}>
        <div className="album-card">
          <img src={track.album.cover_medium} className="img-fluid" alt="album-art" />
          <h5>{track.album.title}</h5>
          <p>{track.artist.name}</p>
        </div>
      </Link>
    </Col>
  );
}

export default SearchTrackCard;
