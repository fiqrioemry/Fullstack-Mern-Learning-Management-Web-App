const bcrypt = require("bcrypt");
const { User } = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;

    // input validation
    if (!userName || !userEmail || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // email and username validation
    const existingUser = await User.findOne({
      $or: [{ userEmail }, { userName }],
    });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Username or email already exists",
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // save new user information
    const newUser = new User({
      userName,
      userEmail,
      role: "student",
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).send({
      success: true,
      message: "Registration is success!",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
