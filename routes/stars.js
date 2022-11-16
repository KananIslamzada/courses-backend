const express = require('express');
const { createStar } = require('../controller/starController');
const router = express.Router();

router.post("/create", createStar)


module.exports = router;