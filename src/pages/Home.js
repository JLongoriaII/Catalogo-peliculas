import React from "react";
import { Col, Row } from "antd";
import useFetch from "../hooks/UseFetch.js";

import { URL_API, TOKEN_API } from "../utils/constants.js";

import SliderMovies from "../components/SliderMovies";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

export default function Home() {
  const newMovies = useFetch(
    `${URL_API}/movie/now_playing?api_key=${TOKEN_API}&language=es-ES&page=1`
  );

  const popularMovies = useFetch(
    `${URL_API}/movie/popular?api_key=${TOKEN_API}&language=es-ES&page=1`
  );

  const topMovies = useFetch(
    `${URL_API}/movie/top_rated?api_key=${TOKEN_API}&language=es-ES&page=1`
  );

  return (
    <>
      <SliderMovies movies={newMovies} />
      <Row>
        <Col span={12}>
          <MovieList title="Películas Populares" movies={popularMovies} />
        </Col>
        <Col span={12}>
          <MovieList title="Películas Más Votadas" movies={topMovies} />
        </Col>
      </Row>
      <Footer />
    </>
  );
}
