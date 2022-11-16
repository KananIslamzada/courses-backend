const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("comments", CommentsSchema);