const bcrypt = require('bcryptjs');
const db = require('../../models/index')
var crypto = require("crypto");
const User = db.user 
const Otp = db.otp
const Activate = db.activate
const Op = db.sequelize.Op
const jwt = require('jsonwebtoken');
const sendEmail = require('../../service/mailer/sender');


function testRegexEmail(string) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    if (reg.test(string)) {
        return true
    }
    return false
}

function testRegexPassword(string) {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(reg.test(string)){
        return true
    }
    return false
}


exports.create = (async (req, res) => {


 
    const salt = bcrypt.genSaltSync(10)

    var newUser = {
        name: req.body.name,
        email: req.body.email ,
        password: bcrypt.hashSync(req.body.password, salt),
        status: 0
    }

    if (testRegexEmail(req.body.email) === false) {
        res.status(401).send({
            status: "Error",
            code: 401,
            message: "Please enter valid email"
        })
    }

    if (testRegexPassword(req.body.password) === false) {
        res.status(401).send({
            status: "Error",
            code: 401,
            message: "Password must one letter and one number and one special character"
        })
    }




    const check_user = await User.findAll({
        where: {
            email: req.body.email
        }
    })

    if(check_user.length > 0) {
        res.status(409).send({
            status: "Error Conflic",
            code: 409,
            message: "User has been registered"
        })
    }else{

        User.create(newUser).then((response) => {
            // res.send(response)
            const code_activate = crypto.randomBytes(20).toString('hex')
            Activate.create({
                user_id: response.id,
                expires: new Date().getTime() + 600000,
                code: code_activate
            })
            sendEmail("register", newUser.email, code_activate)
            res.send({
                status: "Success",
                code: 200
            })
            
        })
    }

})


exports.login = (async (req, res) => {
    const email = req.body.email 
    const password = req.body.password 

   
    
    
    const users = await User.findAll({
        where: {
            email: email
        },
        limit: 1
    });
    if(users.length <= 0) {
        res.status(401).send({
            status: "Error",
            code: 401,
            message: "Email or password not found"
        })
    }
    
    users.forEach(element => {
        if (element.status > 0) {
            if(bcrypt.compareSync(password, element.password)) {
                const code = Math.floor(1000 + Math.random() * 9000)
                Otp.create({
                    user_id: element.id,
                    expires: new Date().getTime() + 600000,
                    code: code
                }).then(() => {
                    sendEmail("otp", element.email, code)
                })
                // const accessToken = jwt.sign({ id: element.id, name: element.name, email: element.email }, "zerofivelab-1111111111", {expiresIn: '2h'});
                res.status(200).send({
                    status: "Success",
                    code: 200,
                    // token: accessToken
                    data: {id: element.id, email: element.email}
                })
            }else{
                res.status(401).send({
                    status: "Error",
                    code: 401,
                    message: "Email or password not found"
                })
            }
        }else{
            res.status(401).send({
                status: "Error",
                code: 401,
                message: "Check your email to activate account"
            })
        }


    })


})

exports.activate = (async (req, res) => {
    const current = new Date().getTime()

    const user = await Activate.findAll({
        include: [{
            model: User,
            // attributes: ['id']
        }],
        attributes: ['code', 'id', 'expires'],
        where: {
            code: req.body.token
        },
        limit: 1
    })
    if (current > user[0].expires) {
        res.status(400).send({
            status: "Error",
            code: 400,
            message: "Token expired"
        })
    }
    user[0].user.status = 1
    if(user[0].user.save()) {
        user[0].destroy()
        res.status(200).send({
            status: "Success",
            code: 200,
            message: "Account Active"
        })
    }else{
        res.status(400).send({
            status: "Error",
            code: 400,
            message: "Security Reason"
        })
    }
})

exports.otp = (async (req, res) => {
    const current = new Date().getTime();
    const id = req.body.id
    const otp = req.body.otp 

    const searchOtp = await Otp.findAll({
        include: [User],
        where: {
            code: otp,
            user_id: id
        }
    })
    if(searchOtp.length <= 0) {
        res.status(401).send({
            status: "Error",
            code: 401,
            message: "Token Error"
        })
    }

    if (current > searchOtp[0].expires) {
        res.status(400).send({
            status: "Error",
            code: 400,
            message: "Token expired"
        })
    }
    if(searchOtp[0].code == otp && id == searchOtp[0].user_id) {
        const accessToken = jwt.sign({ id: searchOtp[0].user.id, name: searchOtp[0].user.name, email: searchOtp[0].user.email }, "zerofivelab-1111111111", {expiresIn: '2h'});
        searchOtp[0].destroy()
        res.status(200).send({
            status: "Success",
            code: 200,
            token: accessToken
        })

    }else{
        res.status(400).send({
            status: "Error",
            code: 400,
            message: "Security Reason"
        })
    }

    
})

exports.update = (async (req, res) => {
    const ids = req.body.user_id
    const name = req.body.name
    const password = req.body.password 

    if(testRegexPassword(password) === false) {
        res.status(200).send({
            status: "Error",
            code: 401,
            message: "Password must one letter and one number and one special character"
        })
    }


})