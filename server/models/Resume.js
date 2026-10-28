const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "",
      trim: true,
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
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    skills: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    projects: {
      type: String,
      default: "",
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

    // Profile photo for Template 2
    photo: {
      type: String,
      default: "",
    },

    template: {
      type: String,
      default: "Template 1",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);