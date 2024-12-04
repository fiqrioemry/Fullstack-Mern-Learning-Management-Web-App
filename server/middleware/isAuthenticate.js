const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ").pop();

  try {
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Session expired, Please Login",
      });

    const dataDecode = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = dataDecode;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access !!!",
    });
  }
};
