import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "users" },
  imageId: { type: mongoose.Schema.ObjectId, ref: "images" },
  dbStatus: { type: Boolean, default: true }
});

const like = mongoose.model("likes", likeSchema);

export default like;