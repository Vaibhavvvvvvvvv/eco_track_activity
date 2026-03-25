const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const actionRoutes = require('./routes/actions');
const leaderboardRoutes = require('./routes/leaderboard');
const botRoutes = require('./routes/bot');
const rewardsRoutes = require('./routes/rewards');
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/bot', botRoutes);
app.use('/api/rewards', rewardsRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecotrack')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
  });
