const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost
} = require('../controllers/postController');

const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getAllPosts);      
router.get('/:id', getPostById);  

// Protected routes
router.get('/me/mine', protect, getMyPosts); 
router.get('/me', protect, getMyPosts);   

router.post('/', protect, createPost);     
router.put('/:id', protect, updatePost);   
router.delete('/:id', protect, deletePost); 

module.exports = router;
