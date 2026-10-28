const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%!]).{8,}$/;

// ======================================================
// SIGNUP
// ======================================================

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@#$%!).",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================================
// LOGIN
// ======================================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================================
// FORGOT PASSWORD
// ======================================================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    /*
      Don't reveal whether the email exists.
      This prevents people from discovering
      registered accounts.
    */

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists for this email, a verification code has been sent.",
      });
    }

    // ==================================================
    // Generate 6-digit OTP
    // ==================================================

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    // Hash OTP before storing it
    const otpHash = await bcrypt.hash(otp, 10);

    // ==================================================
    // Generate secure reset token
    // ==================================================

    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash reset token before storing it
    const resetTokenHash = await bcrypt.hash(
      resetToken,
      10
    );

    // ==================================================
    // Expiration times
    // ==================================================

    // OTP expires after 10 minutes
    const otpExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Reset token expires after 15 minutes
    const resetTokenExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // ==================================================
    // Save reset information
    // ==================================================

    user.resetOtpHash = otpHash;
    user.resetOtpExpires = otpExpires;

    user.resetTokenHash = resetTokenHash;
    user.resetTokenExpires = resetTokenExpires;

    await user.save();

    // ==================================================
    // Development testing
    // ==================================================

    console.log("------------------------------------");
    console.log("PASSWORD RESET REQUEST");
    console.log("Email:", normalizedEmail);
    console.log("OTP:", otp);
    console.log("Reset Token:", resetToken);
    console.log("------------------------------------");

    /*
      TEMPORARY DEVELOPMENT RESPONSE.

      Later, the OTP will be sent to the user's
      email and these two fields will be removed.
    */

    return res.status(200).json({
      success: true,
      message:
        "If an account exists for this email, a verification code has been sent.",
      developmentOtp: otp,
      developmentResetToken: resetToken,
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================================
// VERIFY OTP
// ======================================================

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check required fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Validate email
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Check whether OTP exists
    if (!user.resetOtpHash || !user.resetOtpExpires) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Check OTP expiration
    if (new Date() > user.resetOtpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // Compare entered OTP with stored hash
    const isOtpCorrect = await bcrypt.compare(
      otp.toString(),
      user.resetOtpHash
    );

    if (!isOtpCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ==================================================
    // OTP VERIFIED
    // ==================================================

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetTokenRequired: true,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================================
// RESET PASSWORD
// ======================================================

const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    // Check required fields
    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Email, reset token and new password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Validate email
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Validate new password
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@#$%!).",
      });
    }

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Check whether reset token exists
    if (!user.resetTokenHash || !user.resetTokenExpires) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Check token expiration
    if (new Date() > user.resetTokenExpires) {
      return res.status(400).json({
        success: false,
        message:
          "Reset token has expired. Please request a new OTP.",
      });
    }

    // Compare reset token with stored hash
    const isTokenCorrect = await bcrypt.compare(
      resetToken,
      user.resetTokenHash
    );

    if (!isTokenCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // ==================================================
    // Hash new password
    // ==================================================

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    user.password = hashedPassword;

    // ==================================================
    // Clear password reset information
    // ==================================================

    user.resetOtpHash = null;
    user.resetOtpExpires = null;
    user.resetTokenHash = null;
    user.resetTokenExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};