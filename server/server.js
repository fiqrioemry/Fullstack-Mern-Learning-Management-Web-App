const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const services = require("./routes");

dotenv.config();

// env configuration
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // allow client to send cookies
    methods: ["POST", "PUT", "GET", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// db configuration
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

// route configuration
app.use("/api/auth", services.authRoute);

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
