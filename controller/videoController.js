const { validateAsync, createVideoSchema, Str } = require("../constants/Validations");
const Comments = require("../models/Comments");
const Videos = require("../models/Videos");


const createVideo = async (req, res) => {
    const { url, title } = req.body;

    try {
        await validateAsync(createVideoSchema, { url, title });
        const newVideo = new Videos({
            url,
            title
        })

        const video = await newVideo.save();

        res.status(200).json({ message: "Video added!" })

    } catch (error) {
        if (error?.code === 11000)
            return res.status(400).json({
                message: "This title is already exists!",
            });
        res.status(400).json(error)
    }
}

const getAllVideos = async (_, res) => {
    try {
        const videos = await Videos.find().populate("comments");
        res.status(200).json({
            data: videos,
            count: videos.length
        })
    } catch (error) {
        res.status(400).json(error)
    }

}

const getVideo = async (req, res) => {
    const { id } = req.params
    try {
        await validateAsync(Str, id);
        const video = await Videos.findOne({ _id: id }).populate("comments");
        if (!video) return res.status(400).json({ message: "Video not found!" });
        // const stars = await Comments.find({videoId:id});
        res.status(200).json(video);

    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports = {
    createVideo,
    getAllVideos,
    getVideo
}