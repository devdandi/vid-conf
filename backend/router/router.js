const home = require('../controllers/home/home')
const user = require('../controllers/user/user')
const meeting = require('../controllers/meeting/meeting')

module.exports = (app) => {
    app.get('/', home.index)

    // register
    app.post('/register', user.create)
    // login
    app.post('/login', user.login)
    // activate
    app.post('/activate', user.activate)
    
    //otp confirm
    app.post('/otp', user.otp)

    app.post('/meeting/create', meeting.create)

    app.post('/update', user.update)

    app.post('/meeting/list', meeting.getMeeting)
}