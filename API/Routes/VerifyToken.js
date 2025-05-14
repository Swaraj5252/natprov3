const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid token")
            }else{
                req.user = user
                next()
            }
        })
    }else{
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next()
        }else{
            res.status(403).json("You are authorized to do that!")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuth}