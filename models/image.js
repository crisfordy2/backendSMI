import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: String,
  description: String,
  url:String,
  visibility: Boolean,
  userId: { type: mongoose.Schema.ObjectId, ref: "users" },
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const image = mongoose.model("images", imageSchema);

export default image;