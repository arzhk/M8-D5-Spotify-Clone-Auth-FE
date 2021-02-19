import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Search from "./components/Search";
import YourLibrary from "./components/YourLibrary";
import AlbumPage from "./components/AlbumPage";
import PlayerBar from "./components/PlayerBar";
import ArtistPage from "./components/ArtistPage";
import Register from "./components/Registration";
import Login from "./components/Login/Login";
import { checkLoginHandler } from "./components/checkLogin";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
});

function App(props) {
  const start = async () => {
    const data = await checkLoginHandler();
    console.log(data);
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <Router>
      {!props.user.account.name && (
        <>
          <Redirect to="/login" />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />
        </>
      )}
      {props.user.account.name && (
        <>
          <Redirect to="/home" />
          <Route path="/" component={Navigation} />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/library" component={YourLibrary} />
            <Route path="/album/" component={AlbumPage} />
            <Route path="/artist/:id" component={ArtistPage} />
          </Switch>
          <Route path="/" component={PlayerBar} />
        </>
      )}
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
