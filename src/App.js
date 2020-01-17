import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import MenuTop from "./components/MenuTop";

// Pages
import Home from "./pages/Home.js";
import Error404 from "./pages/Error404.js";
import Movie from "./pages/movie/Movie.js";
import NewMovies from "./pages/NewMovies.js";
import PopularMovies from "./pages/PopularMovies.js";
import SearchMovies from "./pages/SearchMovies.js";

export default function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop />
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/new-movies" exact={true}>
              <NewMovies />
            </Route>
            <Route path="/popular-movies" exact={true}>
              <PopularMovies />
            </Route>
            <Route path="/search-movies" exact={true}>
              <SearchMovies />
            </Route>
            <Route path="/movie/:idMovie" exact={true}>
              <Movie />
            </Route>
            <Route>
              <Error404 path="*" />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}
