const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req,res) => {
    res.send("Backend is Running.")
});

app.get("/api/health", (req,res) => {
  res.json({
    success: true,
    message: "API is working.",
  });
});

app.get("/api/message", (req,res) => {
    res.json({
      success: true,
      message: "Welcome to Resume Builder API",
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});