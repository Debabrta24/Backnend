const { GoogleGenAI } = require("@google/genai")
const readlineSync = require("readline-sync")
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: "AIzaSyAcBWUolFfoP9K9rcxuXOSZos7WIXxI5dw" });



const converstaionHistory = [];
async function aiMain(msg) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: converstaionHistory,
    });
    const answer = response.text
    return answer
}


//weather  leke jo awega
const weatherInfo = []

async function getWeather(location) {

    for (const { city, date } of location) {
        if (date.toLowerCase()== 'today') {
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
    const question = readlineSync.question("May i help you ")
    console.log(question)
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
    converstaionHistory.push({
        role: "user",
        parts: [{ text: prompt }]
    })
    while (true) {
        const response = await aiMain()
        const ans = JSON.parse(response)
        console.log(ans)
        if (ans.weather_details_needed == false) {
            console.log(ans.weather_report)
        }
        else {


            const weatherInfoemation = await getWeather(ans.location)
            const weatherInfo = JSON.stringify(weatherInfoemation)
            converstaionHistory.push({ user: 'model', parts: [{ text: `this is the weather report ${weatherInfo}` }] })
        }
    }
}
chattting()