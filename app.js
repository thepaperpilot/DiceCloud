// Load environmental variables
require('dotenv').load({path: '.env'})

// Imports
const bodyParser = require('body-parser')
const express = require('express')
const expressValidator = require('express-validator')
const flash = require('express-flash')
const lusca = require('lusca')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const path = require('path')

// Constants
const app = express()
const PORT = process.env.PORT || 8080

// Modules
const passportConfig = require('./config/passport')

// Controllers (route handlers)
const characterController = require('./controllers/character')
const userController = require('./controllers/user')

// Connect to database
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', err => {
    console.error(err)
    console.log('MongoDB connection error. Please make sure MongoDB is running.')
    process.exit()
})

// Express configuration
app.set('port', PORT)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(
    session({
        secret: process.env.APP_SECRET,
        cookie: {maxAge: 1209600000}, // two weeks in milliseconds
        store: new MongoStore({
            url: process.env.MONGODB_URI,
            autoReconnect: true
        }),
        resave: false,
        saveUninitialized: false
    })
    )
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}))

// Security :+1:
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Routing
// route controllers
// faux route controllers
app.get('/api/character', characterController.get)
app.get('/api/character/list', passportConfig.isAuthenticated, characterController.getList)
app.post('/login', userController.postLogin)
app.get('/logout', userController.logout)
app.post('/signup', userController.postSignup)
app.post('/auth/user', userController.auth)

// Error page
app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) return next()

    // Log it
    console.error(err.stack)

    // Send error message
    res.status(500)
})

// 404 page
app.use((req, res) => {
    res.status(404)
})

// Start server
const Server = app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)

})
exports.io = require('socket.io').listen(Server)
