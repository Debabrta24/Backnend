const { createClient } = require('redis');
const cradisClient = createClient({
    username: 'default',
    password: 'hbxwZzvX1w9ElMHNEiFF0NExiK2z9WQf',
    socket: {
        host: 'redis-17234.c325.us-east-1-4.ec2.cloud.redislabs.com',
        port: 17234
    }
});
const connectRadis = async () => {
    await cradisClient.connect()
    console.log("connect to radis")
}
connectRadis()

module.exports = cradisClient