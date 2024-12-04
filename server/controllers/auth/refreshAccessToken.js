const Users = require("../../models/Users");

module.exports = async (req, res) => {
  try {
    const { userId } = req.user;

    const refreshToken = await Users.findOne({ _id: userId });

    if (!refreshToken && refreshToken.expiresAt < Date.now()) {
      res
        .status(401)
        .send({ message: "Session expired, Please login to your account" });
    }
  } catch (error) {}
};
