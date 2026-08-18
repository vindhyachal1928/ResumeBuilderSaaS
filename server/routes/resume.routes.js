const express = require("express");

const {
  createResume,
  getResumes,
} = require("../controllers/resume.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Create Resume
router.post("/", authMiddleware, createResume);

// Get User's Resumes
router.get("/", authMiddleware, getResumes);

module.exports = router;