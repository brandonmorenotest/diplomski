import express from "express";
import {
  createPost,
  deletePost,
  getPopularContents,
  getPost,
  getPostContent,
  getPosts,
  stats,
  updatePost,
  updatePostStatus,
} from "../controllers/postController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// ADMIN ROUTES
router.post("/admin-analytics", userAuth, stats);
router.post("/admin-content", userAuth, getPostContent);
router.post("/create-post", userAuth, createPost);


// UPDATE POST
router.patch("/update-status/:id", userAuth, updatePostStatus);
router.patch("/update/:id", userAuth, updatePost);

// GET POSTS ROUTES
router.get("/", getPosts);
router.get("/popular", getPopularContents);
router.get("/:postId", getPost);

// DELETE POSTS ROUTES
router.delete("/:id", userAuth, deletePost);

export default router;
