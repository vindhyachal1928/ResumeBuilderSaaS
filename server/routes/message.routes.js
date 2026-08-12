const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.json({
        success: true,
        message: "Api is working in backend."
    });
});

module.exports = router;