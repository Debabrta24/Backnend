const { GoogleGenAI } = require("@google/genai")

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: "AIzaSyBB8GbnYsZbtJkNr3cds25akFNN2oWxbaA" });

async function aiMain(msg) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: msg,
    });
    const answer = response.text
    return answer
}
module.exports = aiMain
