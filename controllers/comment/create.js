import Blog from "../../models/blog.model.js";
import Comment from "../../models/comment.model.js";

const handleCreateComment = async (req, res) => {
  const { author, comment } = req.body;
  const { blogId } = req.params;

  if (!blogId) {
    res.status(400).json({
      error: true,
      message: "Invalid blog id!",
    });
  }

  if (!author || !comment) {
    res.status(400).json({
      error: true,
      message: "All fields are required!",
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

    const newComment = new Comment({ author, comment, blogId });
    await newComment.save();

    res.status(201).json({
      error: false,
      message: `Comment posted on blog - ${blog.title}`,
      data: newComment,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleCreateComment;
