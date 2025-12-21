import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  searchPosts
} from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Search route must come before /:id
router.get('/search', searchPosts);

// Protected routes for the current user
router.get('/me/mine', protect, getMyPosts); 
router.get('/me', protect, getMyPosts);   

// Public routes
router.get('/', getAllPosts);

router.post("/", protect, upload.array("images"), createPost); // Added protect middleware to associate posts with authenticated users
router.get('/:id', getPostById);
router.put('/:id', protect, upload.array("images"), updatePost);   
router.delete('/:id', protect, deletePost); 

export default router;
