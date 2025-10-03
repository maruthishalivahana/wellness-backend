const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {

    await mongoose.connect("mongodb://localhost:27017/wellnessHospitals");

}


module.exports = connectDB;