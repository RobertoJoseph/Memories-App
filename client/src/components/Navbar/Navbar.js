import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState(parseJson());
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("THE USER ", user);
  const logout = () => {
    dispatch({ type: "LOG_OUT" });
    history.push("/");
    setUser(null);
  };
  function parseJson() {
    try {
      return JSON.parse(localStorage.getItem("profile"));
    } catch (ex) {
      return "";
    }
  }
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decoddedToken = decode(token);
      if (decoddedToken.exp * 1000 < new Date().getTime) {
        logout();
      }
    }
    setUser(parseJson());
  }, [location]);

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            Memories
          </Typography>
          <img
            src={memories}
            className={classes.image}
            alt="memories"
            height="60"
          ></img>
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user ? user.result.name : ""}
                src={user ? user.result.picture : ""}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user ? user.result.name : ""}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/auth"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
