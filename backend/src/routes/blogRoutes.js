import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogsByAuthorId, getSingleBlog, updateBlog } from '../controllers/blogControllers.js';
import { authenticateUser } from '../controllers/userController.js';

const router = express.Router();

router.get("/author/:authorId",getBlogsByAuthorId);
router.get("/",getAllBlogs);
router.post("/create", authenticateUser,createBlog);
router.get("/blog/:blogId",getSingleBlog)
router.put("/blog/:blogId",authenticateUser,updateBlog);
router.delete("/blog/:blogId",authenticateUser,deleteBlog);

export default router;