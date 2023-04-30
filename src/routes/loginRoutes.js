const express = require("express");
const LoginController = require("../controllers/loginController");
const router = express.Router();

router.post("/api/login", LoginController.verifyLogin);
