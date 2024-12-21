import Blog from "../../models/blog.model.js";
import Comment from "../../models/comment.model.js";

const handleGetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    const blogsData = await Promise.all(
      blogs.map(async (blog) => {
        const comments = await Comment.find({ blogId: blog._id });
        const blogData = blog.toObject();
        blogData.comments = comments ?? [];
        return blogData;
      })
    );

    return res.status(200).json({
      error: false,
      message: "Blogs fetched successfully!",
      data: blogsData,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export default handleGetAllBlogs;
