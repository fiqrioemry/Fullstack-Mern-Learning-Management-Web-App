const Course = require("../../models/Course");

module.exports = async function updateCourseById(req, res) {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
