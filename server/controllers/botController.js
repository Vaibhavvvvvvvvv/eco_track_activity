require("dotenv").config();

const axios = require("axios");
const Action = require("../models/Action");
const {
  CATEGORY_POINTS,
  ACTION_GROUPS,
} = require("../utils/ecoConstants");

// 🔹 helper
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function prettyActionTitle(actionValue) {
  const spaced = String(actionValue).replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// 🔹 fallback logic
function fallbackSuggestion() {
  const groups = Object.keys(ACTION_GROUPS);
  const randomGroup = randomItem(groups);
  const actionValue = randomItem(ACTION_GROUPS[randomGroup]);

  return {
    title: prettyActionTitle(actionValue),
    group: randomGroup,
    points: CATEGORY_POINTS[actionValue] || 5,
    actionValue,
    reason: "A simple eco-friendly step you can take today 🌱",
  };
}

// 🔹 MAIN FUNCTION
const suggest = async (req, res) => {
  try {
    const { message } = req.body;

    const recent = await Action.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(5);

    const history = recent.map((a) => a.category).join(", ");

    const prompt = `
You are an eco-friendly assistant.

User previous actions: ${history}

User message: "${message}"

Suggest ONE eco-friendly action.

Return ONLY JSON:
{
  "title": "",
  "group": "",
  "points": "",
  "reason": "",
  "actionValue": ""
}
`;

    // 🔥 TRY OPENROUTER AI
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mixtral-8x7b-instruct",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = response.data.choices[0].message.content;

      const cleanText = text.replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleanText);

      return res.json({
        reply: `🤖 ${data.title} (+${data.points} pts)\n${data.reason}`,
        suggestion: data,
      });

    } catch (aiError) {
      console.log("❌ OpenRouter failed → fallback");

      // 🔥 FALLBACK
      const fallback = fallbackSuggestion();

      return res.json({
        reply: `⚠️ AI unavailable, but here's a great idea:\n🌱 ${fallback.title} (+${fallback.points} pts)\n${fallback.reason}`,
        suggestion: fallback,
      });
    }

  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { suggest };