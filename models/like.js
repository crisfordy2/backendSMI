import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "users" },
  imageId: { type: mongoose.Schema.ObjectId, ref: "images" },
  dbStatus: Boolean,
});

const like = mongoose.model("likes", likeSchema);

export default like;