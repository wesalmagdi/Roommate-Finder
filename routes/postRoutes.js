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

const router = express.Router();

// Search route must come before /:id
router.get('/search', protect, searchPosts);

// Protected routes for the current user
router.get('/me/mine', protect, getMyPosts); 
router.get('/me', protect, getMyPosts);   

// Public routes
router.get('/', getAllPosts);

// Dynamic route last
router.get('/:id', getPostById);

// Create / update / delete
router.post('/', protect, createPost);     
router.put('/:id', protect, updatePost);   
router.delete('/:id', protect, deletePost); 

export default router;
