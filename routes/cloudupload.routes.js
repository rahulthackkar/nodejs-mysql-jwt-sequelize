const cloudUploadController = require("../controllers/cloudupload.controller");
const upload = require("../middleware/upload");
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
