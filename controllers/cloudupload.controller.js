const { s3Uploadv2 } = require("../utils/s3Service");
const { googleCloudUpload } = require("../utils/googleBucketService");

// Upload file to google cloud bucket
exports.fileUploadToGoogleBucket = async (req, res, next) => {
  try {
    const result = await googleCloudUpload(req.files);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Upload file to aws s3 bucket
exports.fileUploadToS3Bucket = async (req, res, next) => {
  try {
    const result = await s3Uploadv2(req.files);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
