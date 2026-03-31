const bcrypt = require("bcrypt")
const password = "Rohit@123"
async function hashingme() {
    console.time("hash")
    const salt =await bcrypt.genSalt(10) //generating salt 
    const hashPass = await bcrypt.hash(password, salt) //generating password
    console.timeEnd("hash")
    console.log(hashPass)
    console.log(salt)
    const ans = await  bcrypt.compare("Rohit@123",hashPass) //this is use to to comapre password here
    console.log(ans)
}
hashingme()