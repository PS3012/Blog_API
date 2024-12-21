import Blog from "../../models/blog.model.js";

const handleDeleteBlog = async (req, res) => {
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

    await Blog.findOneAndDelete({ _id: blogId });
    return res.status(200).json({
      error: false,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleDeleteBlog;
