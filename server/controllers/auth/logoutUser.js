const dotenv = require("dotenv");
dotenv.config();

module.exports = async function logoutUser(req, res) {
  delete req.headers.authorization;

  res.clearCookie("refreshToken");

  return res.status(200).send({
    message: "Logout is Success",
    success: true,
  });
};
