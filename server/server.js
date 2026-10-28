require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const connectDB = require("./config/db");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resume.routes");

const app = express();

const PORT = 5000;

// =========================================================
// DATABASE
// =========================================================

connectDB();

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cors());

// Increased JSON limit for resume photo Base64 data
app.use(express.json({ limit: "10mb" }));

// =========================================================
// ROUTES
// =========================================================

app.use("/api/user", userRoutes);

app.use("/api/health", healthRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/resumes", resumeRoutes);

// =========================================================
// ROOT ROUTE
// =========================================================

app.get("/", (req, res) => {
  res.send("Resume Builder Backend is Running!");
});

// =========================================================
// START SERVER
// =========================================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});