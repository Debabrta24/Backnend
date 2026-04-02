const User = require("../Schema")
const jwt = require("jsonwebtoken")
const { radisClient, connectRadis } = require("../config/radis")
const userAuth = async (req, res, next) => {
    try {

        const { token } = req.cookies
        // console.log(token)
        if (!token) {
            throw new Error("token does not exit")
        }
        const payload = jwt.verify(token, "secret_key_your")
        // console.log(payload)
        const { _id } = payload;
        if (!_id) {
            throw new Error("errror id missing ")
        }
        const result = await User.findById(_id)
        if (!result) {
            throw new Error("errror result missing ")
        }
        const isBlocked = await radisClient.exists(`token:${token}`)
        console.log(isBlocked)
        if (!isBlocked) {
            throw new Error("user doesn't exit")
        }
        req.result = result
        next()
    }
    catch (err) {
        console.log(err)

    }
}
module.exports = userAuth