const dotenv = require("dotenv");
const { User } = require("../../models/User");

dotenv.config();

module.exports = async (req, res) => {
  try {
    const { userId } = req.user;

    // Check if user existence
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    // Assign user profile data
    const payload = {
      firstName: user.userProfile.firstName,
      lastName: user.userProfile.lastName,
      gender: user.userProfile.gender,
      birthday: user.userProfile.birthday,
    };

    // Send response with the user data
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
