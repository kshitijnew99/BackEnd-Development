import { config } from "dotenv";

import { ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  maxOutputTokens: 2048,
});

const prompt = PromptTemplate.fromTemplate(`
    explain {topic} in very simple way like ELI5.
    make sure to include core concept and avoid unnessary jargon.
    make the answer as consise as possible.
    `)


prompt.pipe(model).invoke({topic : "EY techathon 6.0"}).then(response =>{
    console.log(response.content);
    
}); 