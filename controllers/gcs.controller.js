const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
// Instantiate a storage client
const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Upload file to google cloud bucket
exports.fileUpload = (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      message: "No file uploaded!",
    });
    return;
  }
  var fileName = req.file.originalname;
  fileName = fileName.replace(/\s+/g, '-').toLowerCase();
  // New file name with nodejs as prefix in path to place these files separately on your bucket
  const gcsFileName = `nodejs/${Date.now()}-${fileName}`;
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(gcsFileName);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });
  blobStream.on("error", (err) => {
    next(err);
  });
  blobStream.on("finish", () => {
    return blob.makePublic().then(() => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.status(200).json({ file_url: publicUrl });
    });
  });

  blobStream.end(req.file.buffer);
};
