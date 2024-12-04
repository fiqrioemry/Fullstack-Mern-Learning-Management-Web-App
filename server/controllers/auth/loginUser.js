const bcrypt = require("bcrypt");
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const RefreshToken = require("../../models/RefreshToken");
dotenv.config();

module.exports = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    // input validation
    if (!userEmail || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const existUser = await Users.findOne({ userEmail });

    // email validation
    if (!existUser) {
      return res.status(401).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const validPassword = await bcrypt.compare(password, existUser.password);
    // password validation
    if (!validPassword) {
      return res.status(401).send({
        success: false,
        message: "Password is incorrect",
      });
    }

    //generate access token
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

    // generate refresh token
    const refreshToken = jwt.sign(
      {
        userId: existUser._id,
        userName: existUser.userName,
        userEmail: existUser.userEmail,
        userRole: existUser.role,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "30d" }
    );

    // Validate existing token
    const existRefreshToken = await RefreshToken.findOne({
      userId: existUser._id,
    });

    // create or update existing token
    if (!existRefreshToken) {
      await RefreshToken.create({
        userId: existUser._id,
        refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    } else {
      existRefreshToken.refreshToken = refreshToken;
      existRefreshToken.expiresAt = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      );
      await existRefreshToken.save();
    }

    // configure token as cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 30 * 60 * 60 * 1000,
    });

    // send response with data
    return res.status(200).send({
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

    // ? refreshToken not send as a response to client but save to a cookie and not visible in browser
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
