const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client
const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const { format } = require("util");

exports.googleCloudUpload = async (file) => {
  return new Promise((resolve, reject) => {
    var fileName = file.originalname;
    fileName = fileName.replace(/\s+/g, "-").toLowerCase();
    const gcsFileName = `nodejs-upskillfest-rahul/${Date.now()}-${fileName}`;
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(gcsFileName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobStream.on("error", (err) => {
      reject(err);
    });

    // Make an asynchronous call and either resolve or reject

    blobStream.on("finish", () => {
      blob.makePublic().then(() => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      });
    });
    blobStream.end(file.buffer);
  });
};
