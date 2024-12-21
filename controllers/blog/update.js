import Blog from "../../models/blog.model.js";

const handleUpdateBlog = async (req, res) => {
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

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      blog[key] = updates[key];
    });

    const updatedBlog = await blog.save();
    return res.status(200).json({
      error: false,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleUpdateBlog;
