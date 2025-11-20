const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);

router.get('/test', (req, res) => {
    res.send('Auth routes are working!');
});
module.exports = router;
