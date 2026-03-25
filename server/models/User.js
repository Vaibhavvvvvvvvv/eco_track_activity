const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' }, // optional profile image URL
  totalScore: { type: Number, default: 0 },
  // Reward system: store which badge levels are already rewarded.
  // Example: [1,2,3] means coupons were issued for those levels.
  claimedBadgeLevels: { type: [Number], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
