const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: "AIzaSyD806OwOV3K9YEdldHBByqtT3pa7RiCggQ"
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a 30 words",
  });
  console.log(response.text);
}

main();


async function generateContent(base64ImageFile){
    const contents = [
        {
            inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    });
    return response.text;
}

