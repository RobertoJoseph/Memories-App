import React from "react";
import { Container } from "@material-ui/core";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="555799697271-vsnbs8oft2sg5fvfubfffad203t0p5hi.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/auth" exact component={Auth}></Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
export default App;
