import mongoose from "mongoose";

const registerScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  AvaterImage: {
    type: String,
    default: "",
  },
});

const userModel = new mongoose.model("Users", registerScheme);

export default userModel;
