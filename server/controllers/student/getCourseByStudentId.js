const StudentCourses = require("../../models/StudentCourses");

module.exports = async function getCoursesByStudentId(req, res) {
  try {
    const { studentId } = req.params;
    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    res.status(200).json({
      success: true,
      data: studentBoughtCourses.courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
      error: error.message,
    });
  }
};

module.exports = { getCoursesByStudentId };
