import Blog from "../../models/blog.model.js";
import Comment from "../../models/comment.model.js";

const handleUpdateComment = async (req, res) => {
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

    comment.comment = req.body.comment;
    const updatedComment = await comment.save();
    return res.status(200).json({
      error: false,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleUpdateComment;
