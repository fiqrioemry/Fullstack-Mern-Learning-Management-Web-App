const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../../models/RefreshToken");

module.exports = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // validate token as cookie
    if (!refreshToken)
      return res.status(401).send({ message: "Session expired, Please login" });

    // validate token on database
    const existRefreshToken = await RefreshToken.findOne({ refreshToken });

    if (!existRefreshToken) {
      res.status(401).send({ message: "Unauthorized Access !!!" });
    } else if (existRefreshToken.expiresAt < Date.now()) {
      return res.status(401).send({ message: "Session expired, Please login" });
    }

    // decode data from token
    const user = jwt.verify(
      existRefreshToken.refreshToken,
      process.env.REFRESH_TOKEN
    );
    console.log("user user data :", user);

    // assign user data
    const payload = {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      userRole: user.userRole,
    };

    // generate new accesstoken
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    res.status(200).send({ success: true, data: accessToken });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error " });
  }
};
