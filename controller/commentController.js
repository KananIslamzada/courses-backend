const { validateAsync, createCommentSchema } = require("../constants/Validations");
const Comments = require("../models/Comments");
const Videos = require("../models/Videos");


const createComment = async (req, res) => {
    const { videoId, username, comment } = req.body;

    try {
        await validateAsync(createCommentSchema, { videoId, username, comment })
        const video = await Videos.findOne({ _id: videoId });
        if (!video) return res.status(400).json({ message: "Video not found!" });

        const newComment = new Comments({ videoId, username, comment })
        await newComment.save()
        await Videos.updateOne({ _id: videoId }, {
            $push: {
                comments: newComment._id
            }
        })
        res.status(200).json({ message: "Comment created!" })

    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports = {
    createComment
}