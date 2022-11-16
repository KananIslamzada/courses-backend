const express = require('express');
const { createComment } = require('../controller/commentController');
const router = express.Router();

router.post("/create", createComment);

module.exports = router;