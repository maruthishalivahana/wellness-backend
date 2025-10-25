const express = require('express');
const Adminrouter = express.Router();
const { verifyTokenCookie, requireAdmin } = require('../middlewares/auth.middleware');
const AdminController = require("../contorllers/AdminContoller.js");


Adminrouter.post('/create-admin', AdminController.createAdmin);
Adminrouter.post('/login', AdminController.loginAdmin);
Adminrouter.post('/logout', AdminController.AdminLogout);

module.exports = Adminrouter;