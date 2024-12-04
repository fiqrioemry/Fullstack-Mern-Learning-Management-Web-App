const express = require("express");
const authController = require("../../controllers/auth");
const isAuthenticate = require("../../middleware/isAuthenticate");

const router = express.Router();

router.post("/signin", authController.loginUser);
router.delete("/signout", authController.logoutUser);
router.post("/signup", authController.registerNewUSer);
router.get("/refresh", authController.refreshAccessToken);
router.get("/user", isAuthenticate, authController.getUserProfile);
router.put("/user/update", isAuthenticate, authController.updateUserProfile);

module.exports = router;
