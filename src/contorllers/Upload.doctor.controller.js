const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const Doctor = require("../models/doctor.model");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

exports.uploadSingleDoctor = async (req, res) => {
    try {
        const { name, specialization, experience, qualifications, bio } = req.body;
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        console.log("[DEBUG] File received:", req.file.originalname);

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

        console.log("[DEBUG] Cloudinary upload done:", result.secure_url);

        const imageData = {
            originalname: req.file.originalname,
            title: req.file.originalname,
            url: result.secure_url,
            public_id: result.public_id,
        };

        const doctor = new Doctor({
            name,
            specialization,
            experience,
            qualifications,
            bio,
            image: imageData,
        });

        await doctor.save();
        res.status(201).json({ message: "Doctor created successfully", doctor });

    } catch (err) {
        console.error("[ERROR]", err);
        res.status(500).json({ error: err.message });
    }
};
