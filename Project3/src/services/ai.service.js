const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateResponse(contentArr) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contentArr // should be [{ text: "..." }]
        });
        return response.text;
    } catch (error) {
        throw new Error(error.message || "AI service error");
    }
}

module.exports = { generateResponse };