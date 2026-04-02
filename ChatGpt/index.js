const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: "AIzaSyC0pI1xNaPN6W9EfYKqmtFMpwKmdH4qXPs" });






async function main(msg) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${msg}`


    });
    return(response.text);
}

module.exports=main