const express = require("express");
const instructorController = require("../../controllers/instructor");
const router = express.Router();

router.post("/add", instructorController.addNewCourse);
router.get("/get", instructorController.getAllCourses);
router.get("/get/details/:id", instructorController.getCourseDetailsById);
router.put("/update/:id", instructorController.updateCourseById);

module.exports = router;
