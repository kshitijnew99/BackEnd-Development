const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateResponse(contents) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  // If contents is just a string, wrap it in a chat array
  const formatted = typeof contents === "string"
    ? [{ role: "user", parts: [{ text: contents }] }]
    : contents;

  const result = await model.generateContent({ contents: formatted });

  return result.response.text();
}

module.exports = generateResponse;
