import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body; //Validate the req.body
  const postMssage = new PostMessage(post);
  await postMssage.save();
  res.send(postMssage);
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  console.log("Iam updated here");
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, id },
    { new: true }
  );
  res.send(updatePost);
};
