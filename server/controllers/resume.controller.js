const Resume = require("../models/Resume");

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

module.exports = {
  createResume,
};