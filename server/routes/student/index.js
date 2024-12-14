const express = require("express");
const studentController = require("../../controllers/student");
const router = express.Router();

router.get("/get", studentController.getAllStudentViewCourses);
router.get("/get/details/:id", studentController.getStudentViewCoursesDetails);
router.get(
  "/purchase-info/:id/:studentId",
  studentController.checkCoursePurchaseInfo
);
router.get("/get/:studentId", studentController.getCoursesByStudentId);

module.exports = router;
