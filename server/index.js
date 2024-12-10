const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const services = require("./routes");
dotenv.config();

const app = express();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);

app.use("/api/auth", services.authRoute);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log(error));

app.use((err, req, res) => {
  res.status(500).send({
    success: false,
    message: "something went wrong",
    error: err,
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
