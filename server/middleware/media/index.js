const multer = require("multer");
const {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} = require("../../utils/cloudinary");

function storage() {
  multer.diskStorage({
    destination: "uploads/", // local folder name
  });
}

function fileFilter(req, file, cb) {
  const fileTypes = /mp4|mkv|avi|mov/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  }
  cb(`inly file with format ${fileTypes} are allowed`);
}

function upload() {
  multer({
    storage: storage,
    limit: { fileSize: 100000000 }, // maks 100mb
    fileFilter: fileFilter,
  });
}

function multerErrorHandler(error, req, res, next) {
  if (error instanceof multer.MulterError) {
    res.status(400).send({ success: false, message: error.message });
  } else if (error) {
    res.status(500).send({ success: false, message: error.message });
  } else {
    next();
  }
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
