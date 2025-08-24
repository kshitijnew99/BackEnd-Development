const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});




async function generateCaption(base64ImageFile){
    const contents = [
        {
            inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageFile, // is the data type to represent the image into string or text
            },
        },
        { text: " Caption this image ." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config:{
            systemInstruction:` 
                you are an expert in generating captions for images. 
                you generate single caption for an image
                the caption should be under 40 words
                you use hashtag and emojis in the captions.
                the caption should be dark humor
            ` // systemInstruction tell how our model behaves
        }
    });

    return response.text;
}


module.exports = generateCaption
