import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    default: "user",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model("comment", commentSchema);

export { commentModel };
