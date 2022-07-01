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
module.exports = upload;
