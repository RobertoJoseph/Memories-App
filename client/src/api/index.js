import axios from "axios";

const url = "http://localhost:8000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatePost) =>
  axios.patch(`${url}/${id}`, updatePost);
