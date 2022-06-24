const cloudUploadController = require("../controllers/cloudupload.controller");
const Multer = require("multer");
const storage = Multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] == "image") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type!"));
  }
};
const upload = Multer({
  storage,
  fileFilter,
  limits: {
    files: 2, // At a time maximum 2 file uploads
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});
// File Upload Route
module.exports = function (app) {
  app.post(
    "/api/uploadtogc",
    upload.array("file"),
    cloudUploadController.fileUploadToGoogleBucket
  );
  app.post(
    "/api/uploadtos3",
    upload.array("file"),
    cloudUploadController.fileUploadToS3Bucket
  );
};
