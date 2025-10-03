const express = require("express");
const multer = require("multer");
const { uploadSingleDoctor } = require("../contorllers/Upload.doctor.controller.js");

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Single image route
router.post("/add/doctor", upload.single("image"), uploadSingleDoctor);

module.exports = router;
