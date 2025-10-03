
const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    education: {
        // there education backgroud like  what are the qualifications they have eg: MBBS, MD, etc.
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    // qualifications: {
    //     type: [String],
    //     required: true
    // },
    about: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },

    image: {
        url: { type: String, required: true }, // Cloudinary URL
        public_id: { type: String, required: true }, // for deletion
    },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
