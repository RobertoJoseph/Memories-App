import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
  getPost,
  commentPost
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

router.get("/search", getPostBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost",auth,commentPost)

export default router;
