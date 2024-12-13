const express = require("express");
const media = require("../../middleware/media");
const router = express.Router();

router.post(
  "/upload",
  media.upload.single("file"),
  media.multerErrorHandler,
  media.uploadSingleVideo
);

router.post(
  "/bulk-upload",
  media.upload.array("files", 5),
  media.multerErrorHandler,
  media.uploadMultiVideos
);

router.delete("/delete/:id", media.deleteVideo);
module.exports = router;
