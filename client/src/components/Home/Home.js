import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  Button,
  TextField,
} from "@material-ui/core";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { getPostBySearch, getPosts } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";

import Pagination from "../Pagination";
import useStyles from "./styles";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag != tagToDelete));

  const searchPost = () => {
    console.log("THIS IS", tags);
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchPost();
  };

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}></Posts>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearch(e.target.value)}
                ></TextField>
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                ></ChipInput>
                <Button
                  onClick={searchPost}
                  variant="contained"
                  color="primary"
                >
                  Ho
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
              <Paper elevation={6}>
                <Pagination />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};
export default Home;
