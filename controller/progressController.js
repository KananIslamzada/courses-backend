const { validateAsync, Str, addProgressSchema } = require('../constants/Validations');
const Videos = require('../models/Videos');
const Progress = require("../models/Progress")




const getProgress = async (req, res) => {
    const { userId } = req.body;
    try {
        await validateAsync(Str, userId)
        const watched = await Progress.findOne({ userId })
        const videosCount = await Videos.find().count();
        const watchedCount = watched?.videos?.length || 0
        const progress = parseFloat((watchedCount / videosCount).toFixed(2)) * 100

        res.status(200).json({
            progress
        })

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const addProgress = async (req, res) => {
    const { userId, videoId } = req.body;
    try {
        await validateAsync(addProgressSchema, { userId, videoId })
        const video = await Videos.findOne({ _id: videoId });
        if (!video) return res.status(400).json({ message: "Video not found" });
        const progress = await Progress.findOne({ userId });
        if (!progress) {
            const newProgress = new Progress({
                userId,
                videos: [video._id]
            })
            await newProgress.save();
        } else {
            const videoIds = progress.videos?.map(item => item?.toString())
            if (videoIds?.includes(videoId)) return res.status(400).json({ message: "Video is already in progress!" })
            await Progress.updateOne({ userId }, {
                $push: {
                    videos: video._id
                }
            })
        }
        res.status(200).json({ message: "Video added to progress!" })
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getProgress,
    addProgress
}