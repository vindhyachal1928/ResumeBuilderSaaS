const express = require("express");

const {
  createResume,
  getResumes,
  updateResume,
  deleteResume,
} = require("../controllers/resume.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Create Resume
router.post("/", authMiddleware, createResume);

// Get User's Resumes
router.get("/", authMiddleware, getResumes);

// Update Resume
router.put("/:id", authMiddleware, updateResume);

// Delete Resume
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;