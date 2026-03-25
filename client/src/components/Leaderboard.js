import React, { useEffect, useMemo, useState } from 'react';
import api from '../utils/api';

function toDateInput(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function Leaderboard() {
  const [date, setDate] = useState(() => toDateInput(new Date()));
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myCount, setMyCount] = useState(0);

  const params = useMemo(() => ({ date }), [date]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await api.get('/leaderboard/daily', { params });
        setLeaderboard(res.data?.leaderboard || []);
        setMyCount(res.data?.myCount || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [params]);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <div>
          <h2>🏆 Daily Leaderboard</h2>
          <p className="leaderboard-subtitle">Top users by number of tasks completed in a day</p>
        </div>

        <div className="leaderboard-date-picker">
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="leaderboard-summary">
        <div className="reward-card reward-card-highlight">
          <div className="reward-title">Your activity</div>
          <div className="reward-big">{myCount}</div>
          <div className="reward-sub">actions completed on this day</div>
        </div>
      </div>

      <div className="leaderboard-table">
        {loading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🏁</span>
            <h3>No actions yet for this date</h3>
            <p>Be the first to log an eco action.</p>
          </div>
        ) : (
          <div className="leaderboard-rows">
            {leaderboard.map((row, idx) => (
              <div key={row.userId} className="leaderboard-row">
                <div className={`leaderboard-rank ${idx === 0 ? 'rank-1' : ''}`}>
                  #{idx + 1}
                </div>
                <div className="leaderboard-name">{row.name}</div>
                <div className="leaderboard-count">{row.actionsCount} actions</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

