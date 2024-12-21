import Blog from "../../models/blog.model.js";
import Comment from "../../models/comment.model.js";

const handleGetBlogById = async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) {
    return res.status(400).json({
      error: true,
      message: "Invalid Blog Id",
    });
  }

  try {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(400).json({
        error: true,
        message: `Blog with id - ${blogId} not exist`,
      });
    }

    const comments = await Comment.find({ blogId });
    const blogData = blog.toObject();
    blogData.comments = comments ?? [];

    return res.status(200).json({
      error: false,
      message: "Blog found successfully",
      data: blogData,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleGetBlogById;
