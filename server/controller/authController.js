const jwt = require('jsonwebtoken')
const expressJWT = require("express-jwt")

exports.login = (req, res) => {
    const { username, password } = req.body
    if (password === process.env.PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.json({ token, username })
    } else {
        res.status(400).json({
            error: "Password incorrect !"
        })
    }
   
}

//Authantication with Token
exports.requireLogin=expressJWT({
    secret:"test-crud-react",
    algorithms:["HS256"],
    userProperty:"auth"
})