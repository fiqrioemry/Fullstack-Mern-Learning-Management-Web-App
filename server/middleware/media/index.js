const multer = require("multer");

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

module.exports = { upload, multerErrorHandler };
