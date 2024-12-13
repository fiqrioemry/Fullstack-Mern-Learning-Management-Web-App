const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "instructor"], default: "student" },
  userProfile: [
    {
      firstName: String,
      lastName: String,
      birthday: Date,
      gender: { type: String, enum: ["men", "women"] },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
