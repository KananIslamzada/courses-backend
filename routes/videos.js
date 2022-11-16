const express = require('express');
const { createVideo, getAllVideos, getVideo } = require('../controller/videoController');
const router = express.Router();

router.post("/create", createVideo);
router.get("/all", getAllVideos);
router.get("/:id", getVideo)


module.exports = router;