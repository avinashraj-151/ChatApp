import mongoose from "mongoose";

const mongodb_url = "mongodb://localhost:27017/chat";
const connectdb = async () => {
  try {
    await mongoose.connect(mongodb_url);
    console.log("mongodb connected");
  } catch (err) {
    console.log(err.message);
  }
};

export default connectdb;
