const express = require("express");
const authController = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", authController.registerNewUSer);
router.post("/signin", authController.loginUser);

module.exports = router;
