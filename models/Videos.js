const mongoose = require('mongoose');

const VideosSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "comments"
        }
    ],
    averageStarCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("videos", VideosSchema);