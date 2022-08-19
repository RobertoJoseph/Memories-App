import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No Posts";
  return isLoading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid
      classes={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={posts._id} xs={12} sm={12} md={6} lg={4}>
          <Post setCurrentId={setCurrentId} post={post}></Post>
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;
