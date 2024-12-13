const Course = require("../../models/Course");

module.exports = async function getAllCourses(req, res) {
  try {
    const coursesList = await Course.find({});

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
