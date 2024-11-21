import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getFeedPosts } from "../controllers/postController.js";
import { createdPost } from "../controllers/postController.js";
import { deletePost } from "../controllers/postController.js";
import { getPostById } from "../controllers/postController.js";
import { createComment } from "../controllers/postController.js";
import { likePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPosts);
router.post("/create",  protectRoute, createdPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.get("/:id", protectRoute, getPostById);
router.post("/:id/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);

export default router