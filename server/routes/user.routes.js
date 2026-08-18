const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "You can access this protected route",
    user: req.user,
  });
});

module.exports = router;