const { s3Uploadv2 } = require("../utils/s3Service");
const { googleCloudUpload } = require("../utils/googleBucketService");

// Upload file to google cloud bucket
exports.fileUploadToGoogleBucket = async (req, res, next) => {
  const result = googleCloudUpload(req.files[0]);
  result
    .then((fileUrl) => {
      res.json({ fileURL: fileUrl });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
// Upload file to google cloud bucket
exports.fileUploadToS3Bucket = async (req, res, next) => {
  const result = await s3Uploadv2(req.files[0]);
  res.json(result);
};