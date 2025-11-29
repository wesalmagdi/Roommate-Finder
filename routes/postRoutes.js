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

router.get('/', getAllPosts);      
router.get('/:id', getPostById);  

router.get('/me/mine', protect, getMyPosts); 
router.get('/me', protect, getMyPosts);   

router.post('/', protect, createPost);     
router.put('/:id', protect, updatePost);   
router.delete('/:id', protect, deletePost); 
router.get('/search', protect, searchPosts);

export default router;
