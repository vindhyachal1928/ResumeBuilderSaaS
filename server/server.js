const express = require("express");
const healthRoutes = require("./routes/health.routes");
const messageRoutes = require("./routes/message.routes");
const app = express();

const PORT = 5000;


app.use("/api/health", healthRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req,res) => {
    res.send("Backend is Running.")
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});