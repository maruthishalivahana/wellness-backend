

require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uploadRoutes = require("./routes/Upload.js")
const Adminrouter = require("./routes/Admin.js");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect("mongodb://localhost:27017/cloud_upload", {

})
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));

// Routes
app.use("/api", uploadRoutes);
app.use("/admin", Adminrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

