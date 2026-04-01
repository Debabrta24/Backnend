const User = require("../Schema")
const jwt = require("jsonwebtoken")
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
        req.result=result
        next()
    }
    catch (err) {
        console.log(err)

    }
}
module.exports = userAuth