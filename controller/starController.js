const { validateAsync, createStarSchema } = require("../constants/Validations");
const Stars = require("../models/Stars");
const Videos = require("../models/Videos");

const generateAverage = (data) => {
    const averageCount = data?.reduce((acc, val) => acc + val.count, 0);
    return Math.round((averageCount / data?.length)) || 0

}

const createStar = async (req, res) => {
    const { videoId, count, userId } = req.body;

    try {
        await validateAsync(createStarSchema, { videoId, count, userId })
        const video = await Videos.findOne({ _id: videoId });
        if (!video) return res.status(400).json({ message: "Video not found!" });
        const newStar = new Stars({
            count,
            userId,
            videoId,
        })

        await newStar.save()
        const allStars = await Stars.find({ videoId });
        const averageCount = generateAverage(allStars);

        await Videos.updateOne({ _id: videoId }, {
            $set: {
                averageStarCount: averageCount
            }
        });

        res.status(200).json({ message: "ok" })

    } catch (error) {
        res.status(400).json(error)
    }
};


module.exports = {
    createStar
}