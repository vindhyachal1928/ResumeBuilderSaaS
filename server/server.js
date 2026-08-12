const express = require("express");
const connectDB = require("./config/db");

const healthRoutes = require("./routes/health.routes");

const app = express();
const PORT = 5000;
connectDB();

app.use("/api/health", healthRoutes);

app.get("/", (req,res) => {
    res.send("Backend is Running.")
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});