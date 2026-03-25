const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addAction, getActions, stats } = require('../controllers/actionController');

router.get('/', auth, getActions);
router.post('/', auth, addAction);
router.get('/stats', auth, stats);

module.exports = router;
