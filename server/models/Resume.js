const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    location: {
      type: String,
    },

    summary: {
      type: String,
    },

    education: {
      type: String,
    },

    skills: {
      type: String,
    },

    experience: {
      type: String,
    },

    projects: {
      type: String,
    },
    },
    {
    timestamps: true,
    }
);

module.exports = mongoose.model("Resume", resumeSchema);