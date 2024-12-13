const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const app = express();

const services = require("./routes");

dotenv.config();

// env configuration
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cookies()); // allow read a cookie such refreshtoken
app.use(express.json()); // allow parsing request body as JSON
app.use(
  cors({
    origin: CLIENT_URL, // restrict only for specified path
    credentials: true, // allow to send credential
    methods: ["POST", "PUT", "GET", "DELETE"], // allow only this method
    allowedHeaders: ["Content-Type", "Authorization"], //allow content such bearer on headers
  })
);

// db configuration
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

// route configuration
app.use("/api/auth", services.authRoute);
app.use("/api/media", services.mediaRoute);
app.use("/api/course", services.instructorRoute);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
