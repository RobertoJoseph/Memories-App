import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 12,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ email: this.email, id: this._id }, "test", {
    expiresIn: "1h",
  });
  return token;
};

export const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
const User = mongoose.model("User", userSchema);
export default User;
