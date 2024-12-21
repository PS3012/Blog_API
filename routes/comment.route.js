import { Router } from "express";
import handleCreateComment from "../controllers/comment/create.js";
import handleUpdateComment from "../controllers/comment/update.js";
import handleDeleteComment from "../controllers/comment/delete.js";

const router = Router({ mergeParams: true });

router.post("/", handleCreateComment);
router.put("/:commentId", handleUpdateComment);
router.delete("/:commentId", handleDeleteComment);

export default router;
