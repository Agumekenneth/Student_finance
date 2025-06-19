const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.post('/', auth, createTransaction);
router.get('/', auth, getTransactions);


// TEMP test route
router.get('/test', (req, res) => {
    res.send('Transactions route works');
  });
  

module.exports = router;