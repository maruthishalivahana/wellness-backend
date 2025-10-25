const Admin = require("../models/admin.model.js");
const bcrypt = require("bcryptjs");
const createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newAdmin = new Admin({ username, email, password });
        await newAdmin.save();

        const token = newAdmin.generateAuthToken();
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000,
            overwrite: true // ensure it replaces any existing cookie
        });


        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (err) {
        res.status(500).json({ message: "Error creating admin", error: err.message });
    }
};



const loginAdmin = async (req, res) => {
    // Implementation for admin login
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = admin.generateAuthToken();
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000
        });

        res.json({ message: "Logged in successfully" });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
}

const AdminLogout = (req, res) => {
    res.clearCookie("auth_token");
    res.json({ message: "Logged out successfully" });
}
// Get all admins
// const getAllAdmins = async (req, res) => {
//     try {
//         const admins = await Admin.find().select("-password");
//         res.status(200).json({ admins });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching admins", error });
//     }
// };

module.exports = {
    createAdmin,
    loginAdmin,
    AdminLogout,
};
