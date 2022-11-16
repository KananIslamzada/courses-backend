const express = require('express');
const { getProgress, addProgress } = require('../controller/progressController');
const router = express.Router();

router.get("/value", getProgress)
router.post("/add", addProgress)


module.exports = router; 