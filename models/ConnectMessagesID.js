const mongoose = require('mongoose');

const connectIdSchema = new mongoose.Schema({
    members:{
        type: Array,
    },
}, {timestamps: true});

module.exports = mongoose.model('ConnectionId', connectIdSchema);