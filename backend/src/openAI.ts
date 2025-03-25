import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: "../.env" });
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not found ❌");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default openai;
