import React, { useEffect, useRef, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function formatBotIntro() {
  return 'Hi! I can suggest an eco-friendly action for you. Type what you feel like doing: waste, transport, energy, water, food, nature, shopping, or advocacy.';
}

export default function EcoBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: formatBotIntro() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const navigate = useNavigate();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e) => {
    e?.preventDefault?.();
    const trimmed = input.trim();
    if (!trimmed && loading) return;

    setLoading(true);
    setSuggestion(null);
    const userMessage = trimmed.length > 0 ? trimmed : 'suggest something for today';

    setMessages((prev) => [...prev, { from: 'user', text: userMessage }]);
    setInput('');

    try {
      const res = await api.post('/bot/suggest', { message: userMessage });
      const reply = res.data?.reply || 'Try adding an eco action from the Add Action page.';
      const nextSuggestion = res.data?.suggestion || null;

      setSuggestion(nextSuggestion);
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Sorry, I could not get a suggestion right now.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bot-page">
      <div className="bot-header">
        <h2>🤖 Eco Bot</h2>
        <p className="bot-subtitle">Ask for a suggestion, then jump directly to Add Action.</p>
      </div>

      <div className="bot-layout">
        <div className="bot-chat">
          <div className="bot-messages">
            {messages.map((m, idx) => (
              <div
                key={`${m.from}-${idx}`}
                className={`bot-message ${m.from === 'user' ? 'from-user' : 'from-bot'}`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </div>

        <div className="bot-side">
          <div className="bot-card">
            <div className="bot-card-title">Your suggestion</div>
            {suggestion ? (
              <div className="bot-suggestion">
                <div className="bot-suggestion-title">{suggestion.title}</div>
                <div className="bot-suggestion-meta">
                  <span className="bot-tag">{suggestion.group}</span>
                  <span className="bot-points">+{suggestion.points} pts</span>
                </div>
                <button
                  className="btn bot-btn"
                  type="button"
                  onClick={() => navigate(`/add?preset=${encodeURIComponent(suggestion.actionValue)}`)}
                >
                  Add this action
                </button>
              </div>
            ) : (
              <div className="bot-suggestion-empty">
                Ask me something like “I want to reduce waste today” or “suggest transport action”.
              </div>
            )}
          </div>
        </div>
      </div>

      <form className="bot-input-row" onSubmit={send}>
        <input
          type="text"
          value={input}
          placeholder="Type your focus (e.g., waste, energy, transport)..."
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="btn bot-send-btn" type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

