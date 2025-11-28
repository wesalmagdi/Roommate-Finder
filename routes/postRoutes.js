const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  searchPosts
} = require('../controllers/postController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllPosts);      
router.get('/:id', getPostById);  

router.get('/me/mine', protect, getMyPosts); 
router.get('/me', protect, getMyPosts);   

router.post('/', protect, createPost);     
router.put('/:id', protect, updatePost);   
router.delete('/:id', protect, deletePost); 
router.get('/search', protect, searchPosts);

module.exports = router;
