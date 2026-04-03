const mongose = require("mongoose")
async function main() {
    await mongose.connect("")
    console.log("connected")
}

main()