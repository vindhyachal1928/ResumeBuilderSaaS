const express = require("express");

const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resume.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Create Resume
router.post("/", authMiddleware, createResume);

// Get all user's resumes
router.get("/", authMiddleware, getResumes);

// Get single resume
router.get("/:id", authMiddleware, getResumeById);

// Update Resume
router.put("/:id", authMiddleware, updateResume);

// Delete Resume
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;