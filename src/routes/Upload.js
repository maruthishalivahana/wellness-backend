const express = require("express");
const multer = require("multer");
const { uploadSingleDoctor, getDoctors } = require("../contorllers/Upload.doctor.controller.js");

const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware.js");

// const { getAllDoctors } = require("../contorllers/Upload.doctor.controller.js");
const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Single image route
router.post("/add/doctor", verifyToken,
    requireAdmin, upload.single("image"), uploadSingleDoctor);
router.get("/doctors", getDoctors);


module.exports = router;
