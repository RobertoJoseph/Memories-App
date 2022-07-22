import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return !posts.length ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid
      classes={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={posts._id} xs={12} sm={6}>
          <Post setCurrentId={setCurrentId} post={post}></Post>
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;
