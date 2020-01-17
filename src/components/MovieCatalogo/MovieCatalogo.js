import React from "react";
import { Col, Card, Icon } from "antd";
import { Link } from "react-router-dom";

import { IMAGE_URL_API } from "../../utils/constants.js";

import "./MovieCatalogo.scss";

export default function MovieCatalogo(props) {
  const {
    movies: { results }
  } = props;

  return results.map(movie => (
    <Col xs={4} className="movie-catalogo" key={movie.id}>
      <MovieCard movie={movie} />
    </Col>
  ));
}

function MovieCard(props) {
  const {
    movie: { id, title, poster_path }
  } = props;

  const { Meta } = Card;

  const posterPath = `${IMAGE_URL_API}${poster_path}`;

  return (
    <Link to={`/movie/${id}`}>
      <Card
        hoverable
        style={{ width: 220 }}
        cover={<img alt={title} src={posterPath} />}
        actions={[<Icon type="eye" key="eye" />]}
      >
        <Meta title={title}></Meta>
      </Card>
    </Link>
  );
}
