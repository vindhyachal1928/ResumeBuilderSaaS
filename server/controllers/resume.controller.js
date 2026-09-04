const Resume = require("../models/Resume");

// Create Resume
const createResume = async (req, res) => {
  try {
    const {
      fullName,
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
    } = req.body;

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required",
      });
    }

    // Create resume
    const resume = await Resume.create({
      userId: req.user.userId,
      fullName,
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

// Get User's Resumes
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

// Get Single Resume
const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

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

// Update Resume
const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    const {
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
      template,
    } = req.body;

    const resume = await Resume.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId,
      },
      {
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

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

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

// Export Controllers
module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};