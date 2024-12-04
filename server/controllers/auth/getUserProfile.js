const dotenv = require("dotenv");
const { Users } = require("../../models/Users");

dotenv.config();

module.exports = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await Users.findById(userId);

    // check user existance * not necessary *
    if (!req.user || !userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Missing user data",
      });
    }
    // assign userprofile data
    const payload = {
      firstName: user?.firstName || "firstname not defined",
      lastName: user?.lastName || "lastname not defined",
      gender: user?.gender || "Gender not specified",
      birthday: user?.birthday || "Birthday not specified",
    };

    // send response with data
    return res.status(200).send({
      success: true,
      data: payload,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};