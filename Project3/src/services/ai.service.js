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


async function generateVector(content){
    try {
        const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config : {
            outputDimensionality: 768
        }
    });

    return response.embeddings[0].values;

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { 
    generateResponse,
    generateVector
};