const express = require("express");

const { createResume } = require("../controllers/resume.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createResume);

module.exports = router;