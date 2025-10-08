const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Doctor name is required"],
        trim: true,
    },
    education: {
        type: String,
        required: [true, "Education details are required"],
        trim: true,
    },
    experience: {
        type: String,
        required: [true, "Experience is required"],
    },
    about: {
        type: String,
        required: [true, "About field is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },
    department: {
        type: String,
        required: [true, "Department is required"],
        trim: true,
    },
    image: {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
}, { timestamps: true });

// Prevent duplicate doctors in same location + department
doctorSchema.index({ name: 1, location: 1, department: 1 }, { unique: true });

module.exports = mongoose.model("Doctor", doctorSchema);
