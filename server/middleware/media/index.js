const multer = require("multer");
const path = require("path");
const {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} = require("../../utils/cloudinary");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
});

const fileFilter = () => {
  return (req, file, cb) => {
    const fileTypes = /mp4|mkv|avi|mov/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(`inly file with format ${fileTypes} are allowed`);
  };
};

const upload = () => {
  return multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: fileFilter(),
  });
};

function multerErrorHandler(error, req, res, next) {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: `File size is too large. Max allowed size is ${req.body.maxSize} bytes.`,
      });
    }
    return res.status(400).json({ message: error.message });
  } else if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}
// single file upload
async function uploadSingleVideo(req, res) {
  try {
    const file = req.file;
    const result = await uploadMediaToCloudinary(file.path);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error !!!",
      error: error.message,
    });
  }
}

// multi file upload
async function uploadMultiVideos(req, res) {
  try {
    const files = req.files;
    const uploadPromises = files.map((file) =>
      uploadMediaToCloudinary(file.path)
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Iternal Server Error",
      error: error.message,
    });
  }
}

// delete file
async function deleteVideo(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Assest Id is required",
      });
    }

    await deleteMediaFromCloudinary(id);

    res.status(200).json({
      success: true,
      message: "Assest deleted successfully from cloudinary",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Iternal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  upload,
  multerErrorHandler,
  uploadSingleVideo,
  uploadMultiVideos,
  deleteVideo,
};
