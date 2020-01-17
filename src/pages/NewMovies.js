import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MovieCatalogo from "../components/MovieCatalogo";
import Pagination from "../components/Pagination";

import { TOKEN_API, URL_API } from "../utils/constants.js";

export default function NewMovies() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${URL_API}/movie/now_playing?api_key=${TOKEN_API}&language=es-ES&page=${page}`
      );

      const movies = await response.json();
      setMovieList(movies);
    })();
  }, [page]);

  const onChangePage = page => {
    setPage(page);
  };

  return (
    <Row>
      <Col span={24} style={{ textAlign: "center", marginTop: 25 }}>
        <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
          Ultimos Lanzamientos
        </h1>
      </Col>
      {movieList.results ? (
        <Row>
          <Col span={24}>
            <MovieCatalogo movies={movieList} />
          </Col>
          <Col span={24}>
            <Pagination
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : (
        <Col>
          <Loading />
        </Col>
      )}

      <Col span={24}>
        <Footer></Footer>
      </Col>
    </Row>
  );
}
