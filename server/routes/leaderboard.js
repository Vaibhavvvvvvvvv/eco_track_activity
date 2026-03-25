const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { dailyLeaderboard } = require('../controllers/leaderboardController');

router.get('/daily', auth, dailyLeaderboard);

module.exports = router;

