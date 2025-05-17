const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { isAuthenticated } = require("../middleware/auth");

// Serve uploaded files
router.get("/:filename", isAuthenticated, (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath =
      process.env.NODE_ENV === "production" ? path.join("/tmp", "uploads", filename) : path.join(__dirname, "..", "public", "uploads", filename);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("File serving error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
