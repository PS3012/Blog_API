import Blog from "../../models/blog.model.js";
import Comment from "../../models/comment.model.js";

const handleDeleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  if (!blogId) {
    res.status(400).json({
      error: true,
      message: "Invalid Blog Id",
    });
  }

  if (!commentId) {
    res.status(400).json({
      error: true,
      message: "Invalid Comment Id",
    });
  }

  try {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      res.status(400).json({
        error: true,
        message: `Blog with id - ${blogId} not exist`,
      });
    }

    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      res.status(400).json({
        error: true,
        message: `Comment with id - ${commentId} not exist`,
      });
    }

    await Comment.findOneAndDelete({ _id: commentId });
    res.status(200).json({
      error: false,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleDeleteComment;
