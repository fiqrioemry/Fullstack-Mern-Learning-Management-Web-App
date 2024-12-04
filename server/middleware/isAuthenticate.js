const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // get token from header
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ").pop();

  //   validate token
  try {
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Session expired, Please Login",
      });

    //   decode and send as request
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access !!!",
    });
  }
};
