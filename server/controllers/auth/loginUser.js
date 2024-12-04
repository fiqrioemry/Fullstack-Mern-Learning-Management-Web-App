const bcrypt = require("bcrypt");
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    // input validation
    if (!userEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existUser = await Users.findOne({ userEmail });

    // email validation
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "Email is not registered",
      });
    }

    const validPassword = await bcrypt.compare(password, existUser.password);
    // password validation
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    //generate token
    const accessToken = jwt.sign(
      {
        userId: existUser._id,
        userName: existUser.userName,
        userEmail: existUser.userEmail,
        userRole: existUser.role,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "30m" }
    );

    // send response with data
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        user: {
          userId: existUser._id,
          userName: existUser.userName,
          userEmail: existUser.userEmail,
          userRole: existUser.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
