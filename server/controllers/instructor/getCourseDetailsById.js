const Course = require("../../models/Course");

module.exports = async function updateCourseById(req, res) {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
      error: error.message,
    });
  }
};
