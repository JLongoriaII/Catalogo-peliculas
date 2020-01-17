import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Progress } from "antd";
import moment from "moment";

import useFetch from "../../hooks/UseFetch.js";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";

import { TOKEN_API, URL_API, IMAGE_URL_API } from "../../utils/constants.js";

import "./Movie.scss";

export default function Movie() {
  const { idMovie } = useParams();

  const detalleMovie = useFetch(
    `${URL_API}/movie/${idMovie}?api_key=${TOKEN_API}&language=es-ES`
  );

  if (!detalleMovie.result || detalleMovie.loading) {
    return <Loading />;
  }

  return (
    <div>
      <RenderMovie detalleMovie={detalleMovie.result} />
    </div>
  );
}

function RenderMovie(props) {
  const {
    detalleMovie: { backdrop_path, poster_path }
  } = props;

  const backdropPath = `${IMAGE_URL_API}${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={2} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={10} className="movie__detalle">
          <DetalleMovie detalleMovie={props.detalleMovie} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovie(props) {
  const { image } = props;
  const posterPath = `${IMAGE_URL_API}${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }}></div>;
}

function DetalleMovie(props) {
  const {
    detalleMovie: { title, id, release_date, overview, genres, vote_average }
  } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${TOKEN_API}&language=es-ES`
  );

  const openModal = () => {
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  const renderVideo = () => {
    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <>
            <Button icon="play-circle" onClick={openModal}>
              Ver Trailer
            </Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </>
        );
      }
    }
  };

  return (
    <>
      <div className="movie__detalle-header">
        <h1>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__detalle-content">
        <h3>General</h3>
        <p>{overview}</p>
        <Row>
          <Col span={12}>
            <h3>Generos</h3>
            <ul>
              {genres.map(gender => (
                <li key={gender.id}>{gender.name}</li>
              ))}
            </ul>
          </Col>
          <Col style={{ textAlign: "center" }} span={12}>
            <h3>Votos</h3>
            <Progress
              type="circle"
              percent={vote_average * 10}
              width={80}
              format={() => (
                <span style={{ color: "white" }}>{vote_average}/10</span>
              )}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
