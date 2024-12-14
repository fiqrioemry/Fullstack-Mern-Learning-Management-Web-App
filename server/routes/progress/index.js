const express = require("express");
const progressController = require("../../controllers/progress");

const router = express.Router();

router.get(
  "/get/:userId/:courseId",
  progressController.getCurrentCourseProgress
);
router.post(
  "/mark-lecture-viewed",
  progressController.markCurrentLectureAsViewed
);
router.post("/reset-progress", progressController.resetCurrentCourseProgress);
module.exports = router;
