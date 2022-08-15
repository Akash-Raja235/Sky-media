
import { Router } from "express";
import { createPost, deletePost, getPost, getTimeLinePost, likesPost, updatePost } from "../controllers/postController.js";

const router = Router()

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likesPost);
router.get("/:id/timeline", getTimeLinePost);
export default router



