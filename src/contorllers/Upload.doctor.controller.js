const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const Doctor = require("../models/doctor.model");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadSingleDoctor = async (req, res) => {
    try {
        const { name, education, experience, about, location, department } = req.body;
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // 🔍 Check for duplicate
        const existingDoctor = await Doctor.findOne({
            name: new RegExp(`^${name}$`, "i"),
            location: new RegExp(`^${location}$`, "i"),
            department: new RegExp(`^${department}$`, "i")
        });

        if (existingDoctor) {
            return res.status(409).json({
                message: "Doctor with same name, location, and department already exists",
            });
        }

        // 🩺 Proceed with Cloudinary upload
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "doctors" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        const imageData = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        const doctor = new Doctor({
            name,
            education,
            experience,
            about,
            location,
            department,
            image: imageData,
        });

        await doctor.save();
        return res.status(201).json({ message: "Doctor created successfully", doctor });

    } catch (err) {
        console.error("[ERROR]", err);
        if (err.code === 11000) {
            return res.status(409).json({ message: "Duplicate doctor entry detected" });
        } else {
            return res.status(500).json({ error: err.message });
        }
    }
};


//get all doctors
const getDoctors = async (req, res) => {
    try {
        const { location } = req.query
        if (!location) {
            const doctors = await Doctor.find();
            return res.status(200).json({
                message: "Doctors fetched successfully",
                doctors
            })
        }

        const doctorsByLocation = await Doctor.find({
            location: { $regex: new RegExp(location, "i") }
        })

        return res.status(200).json({
            message: `${location}doctors fetched sucessfully`,
            doctors: doctorsByLocation
        })

    } catch (error) {
        console.error("[ERROR]", error);
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getDoctors,
    uploadSingleDoctor
}
