const express = require("express");

const { signup } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", (req, res) => {
  res.json({
    success: true,
    message: "Login route is working",
  });
});

module.exports = router;