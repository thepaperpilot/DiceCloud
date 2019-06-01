const passport = require('passport')
const User = require('../models/User')

exports.postLogin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('password', 'Password cannot be blank').notEmpty()
    req.sanitize('email').normalizeEmail({gmail_remove_dots: false})

    const errors = req.validationErrors()
    if (errors) {
        req.flash('errors', errors)
        return res.redirect('/')
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if (!user) {
            req.flash('errors', info)
            return res.redirect('/')
        }
        req.logIn(user, err => {
            if (err) return next(err)
            res.send({username: user.username})
        })
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err)
        req.user = null
        res.redirect('/')
    })
}

exports.postSignup = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('password', 'Password must be at least 4 characters long').len(4)
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)
    req.sanitize('email').normalizeEmail({gmail_remove_dots: false})


    const errors = req.validationErrors()
    if (errors) {
        console.log(errors)

        req.flash('errors', errors)
        return res.redirect('/')
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    })

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (err) return next(err)
        if (existingUser) {
            req.flash('errors', {msg: 'Account with that email address already exists.'})
            return res.redirect('/')
        }
        user.save(err => {
            if (err) return next(err)
            req.logIn(user, err => {
                if (err) return next(err)
                res.send({username: user.username})
            })
        })
    })
}

exports.auth = (req, res) => res.json({user: req.user ? req.user : null})
