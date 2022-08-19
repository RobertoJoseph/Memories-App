import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { validate } from "../models/user.js";
import mongoose from "mongoose";

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ message: "User doesn't exist." });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(400).json({ message: "Incorrect password" });

  const token = user.generateAuthToken();

  res.status(200).json({ result: user, token });
};

export const signup = async (req, res) => {
  console.log("Iam here in the sign up");
  console.log(req.body);
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    let user = await User.findOne({ email: email });
    console.log(user);
    if (user) return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match." });

    const hashPassword = await bcrypt.hash(password, 12);

    user = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = user.generateAuthToken();

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }

  //    user = new User(_.pick(req.body),[])
};
