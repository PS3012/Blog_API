import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", CommentSchema);

export default Comment;
