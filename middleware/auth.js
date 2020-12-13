const jwt = require('jsonwebtoken')
const logoutTokens = require('./logoutTokens')

const userAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    jwt.verify(authHeader, "coding", (err, data) => {
        // console.log(logoutTokens)
        if (err) {
            console.log("error in auth is " + JSON.stringify(err))
            res.status(401).json({
                message: "Please login in again"
            })
        }else if (logoutTokens.indexOf(authHeader) > -1) {
            console.log("Not considering request since coming from invalidated bearer token")
            res.status(401).json({
                message: "Please login in again"
            })

        //When user hits "logout" route, it will push token to array    
        } else if ((req.originalUrl.indexOf("/logout") > -1)) {
            // console.log("Logging out")
            logoutTokens.push(authHeader)
            next()
        }
        else {
            req.app.set("data1", data)
            next()
        }
    })
}

module.exports = userAuth