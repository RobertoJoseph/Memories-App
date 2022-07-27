import axios from "axios";

const url = "http://localhost:8000/posts";

export const fetchPosts = async () => await axios.get(url);
export const createPost = async (newPost) => await axios.post(url, newPost);
export const updatePost = async (id, updatePost) =>
  await axios.patch(`${url}/${id}`, updatePost);

export const deletePost = async (id) => {
  await axios.delete(`${url}/${id}`);
};

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
