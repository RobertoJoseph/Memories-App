import * as api from "../api";
import { LIKE, CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actions";
export const getPosts = () => async (dispatch) => {
  try {
    const pos = await api.fetchPosts();
    console.log("This is pos :" + pos.data);
    dispatch({ type: FETCH_ALL, payload: pos.data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (currentId, updatePost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, updatePost);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.getPostBySearch(searchQuery);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
