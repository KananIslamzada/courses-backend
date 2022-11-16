const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    videos: [{
        type: mongoose.Types.ObjectId,
        ref: "videos"
    },]

})


module.exports = mongoose.model("progress", ProgressSchema)