const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.post("/api/v1/auth/register", registerUser);
router.post("/api/v1/auth/login", loginUser);

module.exports = router;
