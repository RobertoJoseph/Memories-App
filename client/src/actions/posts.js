import * as api from "../api";
export const getPosts = () => async (dispatch) => {
  try {
    const pos = await api.fetchPosts();
    console.log("This is pos :" + pos.data);
    dispatch({ type: "FETCH_ALL", payload: pos.data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (currentId, updatePost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, updatePost);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
