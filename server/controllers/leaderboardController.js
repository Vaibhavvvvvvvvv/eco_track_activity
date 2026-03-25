const Action = require('../models/Action');

function getDayRange(dateStr) {
  // dateStr expected: YYYY-MM-DD
  if (!dateStr) {
    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end };
  }

  const start = new Date(`${dateStr}T00:00:00`);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

// Leaderboard: users who completed the most actions in a given day.
const dailyLeaderboard = async (req, res) => {
  try {
    const { date } = req.query || {};
    const { start, end } = getDayRange(date);

    const leaderboard = await Action.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      { $group: { _id: '$user', actionsCount: { $sum: 1 } } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          userId: '$_id',
          name: '$user.name',
          actionsCount: 1,
        },
      },
      { $sort: { actionsCount: -1, name: 1 } },
      { $limit: 10 },
    ]);

    const myCount = await Action.countDocuments({
      user: req.user.id,
      date: { $gte: start, $lt: end },
    });

    res.json({
      date: date || start.toISOString().slice(0, 10),
      leaderboard,
      myCount,
    });
  } catch (err) {
    console.error('Error in dailyLeaderboard:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { dailyLeaderboard };

