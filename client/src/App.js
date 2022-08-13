import React from "react";
import { Container } from "@material-ui/core";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = parseJson();
  function parseJson() {
    try {
      return JSON.parse(localStorage.getItem("profile"));
    } catch (ex) {
      return "";
    }
  }
  return (
    <GoogleOAuthProvider clientId="555799697271-vsnbs8oft2sg5fvfubfffad203t0p5hi.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar></Navbar>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Redirect to="/posts" />}
            ></Route>
            <Route path="/posts" exact component={Home}></Route>
            <Route path="/posts/search" exact component={Home}></Route>
            <Route path="/posts/:id" component={PostDetails}></Route>
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            ></Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
export default App;
