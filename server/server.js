require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const connectDB = require("./config/db");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use("/api/user", userRoutes);
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Resume Builder Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});