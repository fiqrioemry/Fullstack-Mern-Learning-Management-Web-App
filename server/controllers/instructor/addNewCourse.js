const Course = require("../../models/Course");

module.exports = async function addNewCourse(req, res) {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
