import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = async (page) => await API.get(`/posts?page=${page}`);
export const createPost = async (newPost) => await API.post("/posts", newPost);
export const updatePost = async (id, updatePost) =>
  await API.patch(`/posts/${id}`, updatePost);

export const deletePost = async (id) => {
  await API.delete(`/posts/${id}`);
};

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);

export const getPostBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const getPost = (id) => API.get(`/posts/${id}`);

export const commentPost = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
