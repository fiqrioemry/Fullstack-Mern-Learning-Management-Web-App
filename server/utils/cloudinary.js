const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
  api_key: process.env.API_KEY,
  secure: true,
});

async function uploadFileToCloudinary(filepath) {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "video",
    });
    return result;
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = uploadFileToCloudinary;
