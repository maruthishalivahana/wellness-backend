const jwt = require("jsonwebtoken");

const verifyTokenCookie = (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        console.log("Token from cookie:", token); // check if it exists

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded); // check payload
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};

module.exports = { verifyTokenCookie, requireAdmin };
