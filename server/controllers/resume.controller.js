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
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required",
      });
    }

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

// Update Resume
const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

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
    } = req.body;

    const resume = await Resume.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId,
      },
      {
        fullName,
        email,
        phone,
        location,
        summary,
        education,
        skills,
        experience,
        projects,
      },
      {
        new: true,
        runValidators: true,
      }
    );

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


// Export Controllers
module.exports = {
  createResume,
  getResumes,
  updateResume,
};