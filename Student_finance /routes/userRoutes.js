const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

// TEMP TEST
router.get('/test', (req, res) => {
    res.send('Users route works');
  });
  

module.exports = router;