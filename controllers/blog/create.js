import Blog from "../../models/blog.model.js";

const handleCreateBLog = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      error: true,
      message: "All fields are required!",
    });
  }

  try {
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    return res.status(201).json({
      error: false,
      message: "Blog created successfully!",
      data: newBlog,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleCreateBLog;
