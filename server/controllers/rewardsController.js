const User = require('../models/User');
const { getBadgeLevel, couponForLevel } = require('../utils/ecoConstants');

// Issues reward coupons for any newly completed badge levels.
// It is safe to call this multiple times; already-issued levels are not reissued.
const claimRewards = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const current = getBadgeLevel(user.totalScore || 0);
    const currentLevel = current.level;

    // Levels start at 1 for rewards. Level 0 is just "Getting Started".
    const eligibleLevels = [];
    for (let l = 1; l <= currentLevel; l++) eligibleLevels.push(l);

    const alreadyClaimed = new Set(user.claimedBadgeLevels || []);
    const newLevels = eligibleLevels.filter((l) => !alreadyClaimed.has(l));

    if (newLevels.length === 0) {
      return res.json({ currentLevel, newRewards: [] });
    }

    await User.updateOne(
      { _id: user._id },
      { $addToSet: { claimedBadgeLevels: { $each: newLevels } } }
    );

    const newRewards = newLevels
      .map((level) => {
        const coupon = couponForLevel(level);
        if (!coupon) return null;
        return { level, ...coupon };
      })
      .filter(Boolean);

    res.json({ currentLevel, newRewards });
  } catch (err) {
    console.error('Error in claimRewards:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { claimRewards };

