const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    password: String,
    passwordResetToken: String,
    passwordResetExpires: mongoose.Schema.Types.Date
}, {timestamp: true, usePushEach: true})

userSchema.methods.comparePassword = function(inputPassword, cb) {
    bcrypt.compare(inputPassword, this.password, cb)
}

userSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) return next()

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', userSchema, 'User')
module.exports = User
