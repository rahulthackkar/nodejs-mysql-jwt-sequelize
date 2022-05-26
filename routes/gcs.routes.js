const gcsController = require("../controllers/gcs.controller");
const Multer = require("multer");
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});
// File Upload Route
module.exports = function (app) { 
  app.post("/api/cloudupload", multer.single("file"), gcsController.fileUpload);
};
