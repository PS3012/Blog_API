import { Router } from "express";
import handleCreateBLog from "../controllers/blog/create.js";
import handleGetAllBlogs from "../controllers/blog/getAll.js";
import handleUpdateBlog from "../controllers/blog/update.js";
import handleDeleteBlog from "../controllers/blog/delete.js";
import handleGetBlogById from "../controllers/blog/getById.js";

const router = Router();

router.get("/", handleGetAllBlogs);
router.post("/", handleCreateBLog);
router.get("/:blogId", handleGetBlogById);
router.put("/:blogId", handleUpdateBlog);
router.delete("/:blogId", handleDeleteBlog);

export default router;
