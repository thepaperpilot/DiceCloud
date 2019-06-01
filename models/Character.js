const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    character: [mongoose.Schema.Types.Mixed],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamp: false})

const Character = mongoose.model('Character', characterSchema)
module.exports = Character
