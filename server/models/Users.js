const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "instructor"], default: "user" },
  userProfile: {
    firstName: String,
    lastName: String,
    birthday: Date,
    gender: { type: String, enum: ["men", "women"] },
  },
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  ],
  createdAt: { type: Date, default: Date.now },
});

const SubscriptionSchema = new mongoose.Schema({
  planName: { type: String, enum: ["1month", "3month", "6month", "1year"] },
  planStart: Date,
  planEnd: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

module.exports = {
  Users: mongoose.model("Users", UserSchema),
  Subscriptions: mongoose.model("Subscription", SubscriptionSchema),
};
