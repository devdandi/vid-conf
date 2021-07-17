const jwt = require('jsonwebtoken')

const tokenVerify = (async (req, res, next) => {
    if (req.url == '/login' || req.url == '/register' || req.url == '/activate' || req.url == '/otp') {
        // console.log('/login')
        next()
    }else{
        const authHeader = req.headers;
    

        // if(authHeader.bearer == "" || authHeader.bearer == null) {
        //     res.status(401).send({
        //         status: "error",
        //         code: 401,
        //         message: "login first or token has expire"
        //     })
        // }
        // jwt.verify(authHeader.bearer, process.env.TOKEN_SECRET, (err, user) => {
        //     // next()
        //     if(err){
        //         res.status(401).send({
        //             status: "error",
        //             code: 401,
        //             message: "login first or token has expire"
        //         })
        //     }
        //     next()
        // })
        console.log(authHeader)
        next()
    }

})

module.exports = tokenVerify