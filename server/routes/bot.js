const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { suggest } = require('../controllers/botController');

router.post('/suggest', auth, suggest);

module.exports = router;

