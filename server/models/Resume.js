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

    jobTitle: {
      type: String,
      default: "",
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

    certificates: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    template: {
      type: String,
      default: "professional",
    },


    },
    {
    timestamps: true,
    }
);

module.exports = mongoose.model("Resume", resumeSchema);