const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
  api_key: process.env.API_KEY,
  secure: true,
});

async function uploadMediaToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "learning_management_system",
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading to cloudinary");
  }
}

async function deleteMediaFromCloudinary(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
    throw new Error("failed to delete assest from cloudinary");
  }
}

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
