const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { claimRewards } = require('../controllers/rewardsController');

router.post('/claim', auth, claimRewards);

module.exports = router;

