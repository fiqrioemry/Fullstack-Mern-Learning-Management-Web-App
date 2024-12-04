const bcrypt = require("bcrypt");
const Users = require("../../models/Users");

module.exports = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;

    // input validation
    if (!userName || !userEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // email and username validation
    const existingUser = await Users.findOne({
      $or: [{ userEmail }, { userName }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // save new user information
    const newUser = new Users({
      userName,
      userEmail,
      role: "user",
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration is success!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
