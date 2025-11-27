const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // JWT middleware

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route example
router.get('/me', protect, (req, res) => {
    res.json({ message: 'Accessed protected route', user: req.user });
});

module.exports = router;
