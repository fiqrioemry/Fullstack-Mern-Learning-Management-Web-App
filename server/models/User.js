const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  planName: { type: String, enum: ["1month", "3month", "6month", "1year"] },
  planStart: Date,
  planEnd: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

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
