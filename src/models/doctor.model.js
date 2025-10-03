
const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }, // in years
    qualifications: {
        type: [String],
        required: true
    }, // ["MBBS", "MD"]

    bio: {
        type:
            String
    },
    image: {
        url: { type: String, required: true }, // Cloudinary URL
        public_id: { type: String, required: true }, // for deletion
    },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
