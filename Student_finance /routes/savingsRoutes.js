const express = require('express');
const router = express.Router();
const { createSavings, getSavings } = require('../controllers/savingsController');
const auth = require('../middleware/auth');

router.post('/', auth, createSavings);
router.get('/', auth, getSavings);

router.get('/test', (req, res) => {
    res.send('✅ Savings route is working');
  });
  

module.exports = router;