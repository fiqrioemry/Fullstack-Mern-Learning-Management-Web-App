const dotenv = require("dotenv");
const { Users } = require("../../models/Users");

dotenv.config();

module.exports = async (req, res) => {
  try {
    const { userId } = req.user;

    const { firstName, lastName, birthday, gender } = req.body;

    // validate user input
    if (!firstName || !lastName || !birthday || !gender) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // check user existance
    const user = await Users.findById(userId);

    if (!req.user || !userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Missing user data",
      });
    }

    user.userProfile.firstName = firstName;
    user.userProfile.lastName = lastName;
    user.userProfile.birthday = birthday;
    user.userProfile.gender = gender;

    // update userprofile data
    const updatedUser = await user.save();

    // assign userprofile data
    const payload = {
      firstName: updatedUser.userProfile.firstName,
      lastName: updatedUser.userProfile.lastName,
      gender: updatedUser.userProfile.birthday,
      birthday: updatedUser.userProfile.gender,
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
