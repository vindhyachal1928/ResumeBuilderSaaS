const mongoose = require("mongoose");
const Resume = require("../models/Resume");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasValidResumeIdentity = (fullName, email) =>
  typeof fullName === "string" &&
  fullName.trim() !== "" &&
  typeof email === "string" &&
  emailRegex.test(email.trim());

const isValidResumeId = (id) => mongoose.Types.ObjectId.isValid(id);

// =========================================================
// CREATE RESUME
// =========================================================

const createResume = async (req, res) => {
  try {
    const {
      title,
      fullName,
      jobTitle,
      email,
      phone,
      location,
      summary,
      education,
      skills,
      experience,
      projects,
      certificates,
      linkedin,
      github,
      portfolio,
      photo,
      template,
    } = req.body;

    // Validate required fields
    if (!hasValidResumeIdentity(fullName, email)) {
      return res.status(400).json({
        success: false,
        message: "A valid full name and email are required",
      });
    }

    // Create resume
    const resume = await Resume.create({
      userId: req.user.userId,

      title: typeof title === "string" ? title.trim() : "",
      fullName: fullName.trim(),
      jobTitle,
      email: email.trim().toLowerCase(),
      phone,
      location,
      summary,
      education,
      skills,
      experience,
      projects,
      certificates,
      linkedin,
      github,
      portfolio,

      // New photo support
      photo,

      // New template support
      template,
    });

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("Create resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =========================================================
// GET USER'S RESUMES
// =========================================================

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error("Get resumes error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =========================================================
// GET SINGLE RESUME
// =========================================================

const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidResumeId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await Resume.findOne({
      _id: id,
      userId: req.user.userId,
    });

    // Resume not found
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =========================================================
// UPDATE RESUME
// =========================================================

const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidResumeId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const {
      title,
      fullName,
      jobTitle,
      email,
      phone,
      location,
      summary,
      education,
      skills,
      experience,
      projects,
      certificates,
      linkedin,
      github,
      portfolio,
      photo,
      template,
    } = req.body;

    if (!hasValidResumeIdentity(fullName, email)) {
      return res.status(400).json({
        success: false,
        message: "A valid full name and email are required",
      });
    }

    const resume = await Resume.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId,
      },
      {
        title: typeof title === "string" ? title.trim() : "",
        fullName: fullName.trim(),
        jobTitle,
        email: email.trim().toLowerCase(),
        phone,
        location,
        summary,
        education,
        skills,
        experience,
        projects,
        certificates,
        linkedin,
        github,
        portfolio,

        // Save photo
        photo,

        // Save selected template
        template,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Resume not found
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =========================================================
// DELETE RESUME
// =========================================================

const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidResumeId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await Resume.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    // Resume not found
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =========================================================
// EXPORT CONTROLLERS
// =========================================================

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};