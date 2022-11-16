const mongoose = require('mongoose');

const StarsSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("stars", StarsSchema);