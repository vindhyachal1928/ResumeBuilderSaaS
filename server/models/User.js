const mongoose = require("mongoose");

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%!]).{8,}$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [
        passwordRegex,
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@#$%!).",
      ],
    },

    // ==============================
    // PASSWORD RESET FIELDS
    // ==============================

    resetOtpHash: {
      type: String,
      default: null,
    },

    resetOtpExpires: {
      type: Date,
      default: null,
    },

    resetTokenHash: {
      type: String,
      default: null,
    },

    resetTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;