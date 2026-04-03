const { GoogleGenAI } = require("@google/genai")
const readlineSync = require("readline-sync")
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: "AIzaSyAbmzEqhn7sLa15kvRQw0fiqQYP4C7D_40" });

async function aiMain(msg) {
    const converstaionHistory = [];
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: converstaionHistory,
    });
    const answer = response.text
    return answer
}


//weather  leke jo awega  

async function getWeather(location) {
    const weatherInfo = []
    for (const { city, date } of location) {
        if (Date.toLowerCase() == 'today') {
            const response = await fetch(`http://api.weatherapi.com/v1/future.json?key=c05679e2129649ed887145306260304&q=${city}`)
            const data = await response.json();
            weatherInfo.push(data)
        }
        else {
            const response = await fetch(`http://api.weatherapi.com/v1/future.json?key=c05679e2129649ed887145306260304&q=${city}&dt=${date}`)
            const data = await response.json();
            weatherInfo.push(data)
        }
    }


}


async function chattting() {



    const userName = readlineSync.question("May i help you ")
    const prompt = `
You are an AI agent, who will respond to me in JSON format only.
Analyse the user query and try to fetch city and date details from it.
Date format should be in (yyyy-mm-dd) if user ask for future weather.
If user ask for today weather, mark date as 'today'.
To fetch weather details, I already have some function which can fetch the weather details for me,

JSON format should look like below:
{
    "weather_details_needed": boolean,
    "location": [{"city":"mumbai", "date":"today"},{"city":"delhi", "date":"2025-04-30"}]
}
if you need weather information, use the below format
JSON format should look like below:
{
    "weather_details_needed": true,
    "location": [{"city":"mumbai", "date":"today"},{"city":"delhi", "date":"2025-04-30"}]
}

Once you have the weather report details, respond me in JSON format only.
JSON format should look like below:
{
    "weather_details_needed": false,
    "weather_report":"Bhai Delhi ka mausam toh badiya hai, 18 degree temperatur hai, ghar pe pakode bana lo"
}
    strictly follow the formate
    
userInput=${question}
`
    await History.push({
        role: "user",
        parts: [{ text: prompt }]
    })
    console.log(userName)
}
