const express = require("express");
const authController = require("../../controllers/auth");

const router = express.Router();

router.post("/signin", authController.loginUser);
router.delete("/signout", authController.logoutUser);
router.post("/signup", authController.registerNewUSer);
router.post("./refresh", authController.refreshAccessToken);

module.exports = router;
