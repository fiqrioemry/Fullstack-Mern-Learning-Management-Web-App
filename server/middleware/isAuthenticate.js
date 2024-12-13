const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ").pop();

  try {
    if (!token)
      return res
        .status(401)
        .send({ success: false, message: "Session expired, please login" });

    const decode = jwt.verify(token, process.env.REFRESH_TOKEN);

    req.user = decode;

    next();
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
