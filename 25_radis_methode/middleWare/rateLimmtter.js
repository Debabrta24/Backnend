const { radisClient } = require("../config/radis");


const windoSize = 3600;
const MaxRequest = 60;


const rateLimiter = async (req, res, next) => {
    try {
        const key = `IP:${req.ip}`;
        const current_time = Date.now() / 1000;
        const window_Time = current_time - windowize

        await radisClient.zRemRangeByScore(key, 0, window_Time)
        const numberOfRequest = radisClient.zCard(key)
        if (numberOfRequest >= MaxRequest) {
            throw new Error("Number of request Extended")
        }
        await redisClient.zAdd(key, [{ score: current_time, value: $`Math.random()` }])
        //request is addded 
        await radisClient.expire(key, windoSize)
        next()
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = rateLimiter;