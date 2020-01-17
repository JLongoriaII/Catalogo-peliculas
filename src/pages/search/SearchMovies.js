import React, { useState, useEffect } from "react";
import { Row, Input, Col } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import MovieCatalogo from "../../components/MovieCatalogo";
import Footer from "../../components/Footer";
import SinData from "../../components/SinData";

import { URL_API, TOKEN_API } from "../../utils/constants.js";

import "./SearchMovies.scss";

function SearchMovies(props) {
  const { Search } = Input;
  const { location, history } = props;

  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      const searchValue = queryString.parseUrl(location.search);
      const { search } = searchValue.query;

      const response = await fetch(
        `${URL_API}/search/movie?api_key=${TOKEN_API}&language=es-ES&query=${search}&page=1`
      );

      const movies = await response.json();

      setSearchValue(search);
      setMovieList(movies);
    })();
  }, [location.search]);

  const onChangeSearch = e => {
    const urlParams = queryString.parse(location.search);
    urlParams.search = e.target.value;
    history.push(`?${queryString.stringify(urlParams)}`);
    setSearchValue(e.target.value);
  };

  return (
    <Row>
      <Col span={12} offset={6} className="search-movies">
        <h1>Busca tu pelicula</h1>
        <Search
          placeholder="Escribe una película"
          onChange={onChangeSearch}
          size="large"
        />
      </Col>
      {movieList.results ? (
        <Row>
          <Col span={24}>
            <MovieCatalogo movies={movieList} />
          </Col>
        </Row>
      ) : (
        <Col span={24}>
          <SinData />
        </Col>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}

export default withRouter(SearchMovies);
