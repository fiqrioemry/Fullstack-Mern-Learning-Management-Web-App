const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getUserProfile = require("./getUserProfile");
const registerNewUSer = require("./registerNewUser");
const updateUserProfile = require("./updateUserProfile");
const refreshAccessToken = require("./refreshAccessToken");

module.exports = {
  loginUser,
  logoutUser,
  getUserProfile,
  registerNewUSer,
  updateUserProfile,
  refreshAccessToken,
};
