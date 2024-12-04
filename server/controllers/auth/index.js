const loginUser = require("./loginUser");
const registerNewUSer = require("./registerNewUser");
const logoutUser = require("./logoutUser");
const refreshAccessToken = require("./refreshAccessToken");
const updateUserProfile = require("./updateUserProfile");
const getUserProfile = require("./getUserProfile");

module.exports = {
  loginUser,
  registerNewUSer,
  logoutUser,
  refreshAccessToken,
  updateUserProfile,
  getUserProfile,
};
